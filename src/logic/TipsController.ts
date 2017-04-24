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
import { AnyValueMap } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { TipV1 } from '../data/version1/TipV1';
import { ITipsPersistence } from '../persistence/ITipsPersistence';
import { ITipsController } from './ITipsController';
import { TipsCommandSet } from './TipsCommandSet';
import { AttachmentsConnector } from './AttachmentsConnector';

export class TipsController implements IConfigurable, IReferenceable, ICommandable, ITipsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'pip-services-tips:persistence:*:*:1.0',
        'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(TipsController._defaultConfig);
    private _persistence: ITipsPersistence;
    private _attachmentsClient: IAttachmentsClientV1;
    private _attachmentsConnector: AttachmentsConnector;
    private _commandSet: TipsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ITipsPersistence>('persistence');

        this._attachmentsClient = this._dependencyResolver.getOneOptional<IAttachmentsClientV1>('attachments');
        this._attachmentsConnector = new AttachmentsConnector(this._attachmentsClient);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new TipsCommandSet(this);
        return this._commandSet;
    }

    public getTips(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<TipV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getRandomTip(correlationId: string, filter: FilterParams, 
        callback: (err: any, tip: TipV1) => void): void {
        this._persistence.getOneRandom(correlationId, filter, callback);
    }

    public getTipById(correlationId: string, tipId: string,
        callback: (err: any, item: TipV1) => void): void {
        this._persistence.getOneById(correlationId, tipId, callback);
    }

    public createTip(correlationId: string, tip: TipV1,
        callback: (err: any, tip: TipV1) => void): void {
        let newTip: TipV1 = null;

        tip.create_time = new Date();
        tip.all_tags = TagsProcessor.extractHashTags(
            tip, 
            'title.en', 'title.sp', 'title.fr', 'title.de', 'title.ru',
            'content.en', 'content.sp', 'content.fr', 'content.de', 'content.ru'
        );

        async.series([
            (callback) => {
                this._persistence.create(correlationId, tip, (err, data) => {
                    newTip = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.addAttachments(correlationId, newTip, callback);
            }
        ], (err) => {
            callback(err, newTip);
        });
    }

    public updateTip(correlationId: string, tip: TipV1,
        callback: (err: any, tip: TipV1) => void): void {
        let oldTip: TipV1 = null;
        let newTip: TipV1 = null;
        
        tip.all_tags = TagsProcessor.extractHashTags(
            tip, 
            'title.en', 'title.sp', 'title.fr', 'title.de', 'title.ru',
            'content.en', 'content.sp', 'content.fr', 'content.de', 'content.ru'
        );

        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, tip.id, (err, data) => {
                    oldTip = data;
                    if (err == null && data == null) {
                        err = new NotFoundException(
                            correlationId,
                            'TIP_NOT_FOUND',
                            'Tip ' + tip.id + ' was not found'
                        ).withDetails('tip_id', tip.id);
                    }
                    callback(err);
                });
            },
            (callback) => {
                this._persistence.update(correlationId, tip, (err, data) => {
                    newTip = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.updateAttachments(
                    correlationId, oldTip, newTip, callback);
            }
        ], (err) => {
            callback(err, newTip);
        });
    }

    public deleteTipById(correlationId: string, tipId: string,
        callback: (err: any, tip: TipV1) => void): void {
        let oldTip: TipV1 = null;

        async.series([
            (callback) => {
                this._persistence.deleteById(correlationId, tipId, (err, data) => {
                    oldTip = data;
                    callback(err);
                });
            },
            (callback) => {
                this._attachmentsConnector.removeAttachments(correlationId, oldTip, callback);
            }
        ], (err) => {
            callback(err, oldTip);
        });
    }

}
