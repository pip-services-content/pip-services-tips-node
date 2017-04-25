let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { IBlobsClientV1 } from 'pip-clients-blobs-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from '../persistence/IAttachmentsPersistence';
import { IAttachmentsController } from './IAttachmentsController';
import { AttachmentsCommandSet } from './AttachmentsCommandSet';

export class AttachmentsController implements IConfigurable, IReferenceable, ICommandable, IAttachmentsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-attachments:persistence:*:*:1.0',
        'dependencies.blobs', 'pip-services-blos:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(AttachmentsController._defaultConfig);
    private _persistence: IAttachmentsPersistence;
    private _blobsClient: IBlobsClientV1;
    private _commandSet: AttachmentsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IAttachmentsPersistence>('persistence');
        this._blobsClient = this._dependencyResolver.getOneOptional<IBlobsClientV1>('blobs');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new AttachmentsCommandSet(this);
        return this._commandSet;
    }

    public getAttachmentById(correlationId: string, id: string,
        callback: (err: any, attachment: BlobAttachmentV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }
    
    public addAttachments(correlationId: string, reference: ReferenceV1, ids: string[],
        callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void {
        let attachments: BlobAttachmentV1[] = [];

        async.series([
            // Record new references to all blobs
            (callback) => {
                async.each(
                    ids, 
                    (id, callback) => {
                        this._persistence.addReference(correlationId, id, reference, (err, attachment) => {
                            if (attachment)
                                attachments.push(attachment);
                            callback(err);
                        });
                    },
                    callback
                );
            },
            // Mark new blobs completed
            (callback) => {
                let blobIds = [];
                _.each(attachments, (a) => {
                    if (a.references && a.references.length <= 1)
                        blobIds.push(a.id);
                });

                if (this._blobsClient != null && blobIds.length > 0)
                    this._blobsClient.markBlobsCompleted(correlationId, blobIds, callback);
                else callback();
            }
        ], (err) => {
            if (callback) callback(err, attachments);
        });
    }

    public updateAttachments(correlationId: string, reference: ReferenceV1, oldIds: string[], newIds: string[],
        callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void {

        let attachments: BlobAttachmentV1[] = [];
        async.parallel([
            // Remove obsolete ids
            (callback) => {
                let ids = _.difference(oldIds, newIds);
                if (ids.length > 0) {
                    this.removeAttachments(
                        correlationId, 
                        reference,
                        ids,
                        (err, removedAttachments) => {
                            _.each(removedAttachments, (a) => {
                                attachments.push(a);
                            });
                            callback(err);
                        }
                    );
                } else callback(null);
            },
            // Add new ids
            (callback) => {
                let ids = _.difference(newIds, oldIds);
                if (ids.length > 0) {
                    this.addAttachments(
                        correlationId,
                        reference,
                        ids,
                        (err, addAttachments) => {
                            _.each(addAttachments, (a) => {
                                attachments.push(a);
                            });
                            callback(err);
                        }
                    );
                } else callback(null);
            }
        ], (err) => {
            if (callback) callback(err, attachments);
        });
    }

    public removeAttachments(correlationId: string, reference: ReferenceV1, ids: string[],
        callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void {
        let attachments: BlobAttachmentV1[] = [];
        async.each(
            ids, 
            (id, callback) => {
                this._persistence.removeReference(correlationId, id, reference, (err, attachment) => {
                    if (attachment)
                        attachments.push(attachment);
                    if (attachment.references == null || attachment.references.length == 0)
                        this.deleteAttachmentById(correlationId, attachment.id, callback)
                    else callback(err);
                });
            },
            (err) => {
                if (callback) callback(err, attachments);
            }
        );
    }

    public deleteAttachmentById(correlationId: string, id: string,
        callback?: (err: any, attachment: BlobAttachmentV1) => void): void {
        this._persistence.deleteById(correlationId, id, (err, attachment) => {
            if (err == null && this._blobsClient != null) {
                this._blobsClient.deleteBlobById(correlationId, id, (err, blob) => {
                    if (callback) callback(err, attachment);
                })
            } else if (callback) callback(err, attachment);
        });
    }
}
