let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentsV1 } from '../data/version1/BlobAttachmentsV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';
import { BlobAttachmentsMongoDbSchema } from './BlobAttachmentsMongoDbSchema';

export class AttachmentsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<BlobAttachmentsV1, string> 
    implements IAttachmentsPersistence {

    constructor() {
        super('attachments', BlobAttachmentsMongoDbSchema());
    }

    public addReference(correlationId: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentsV1) => void): void {

        let filter = {
            _id: id
        };

        let data = {
            $push: { 
                references: { 
                    id: reference.id,
                    type: reference.type,
                    name: reference.name
                }
            }
        }

        let options = {
            new: true,
            upsert: true
        };
        
        this._model.findOneAndUpdate(filter, data, options, (err, newItem) => {
            if (err != null)
                this._logger.trace(correlationId, "Added reference in %s to id = %s", this._collection, id);
           
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }

    public removeReference(correlationId: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentsV1) => void): void {

        let filter = {
            _id: id
        };

        let data = {
            $pop: { 
                references: { 
                    id: reference.id,
                    type: reference.type
                }
            }
        }

        let options = {
            new: true
        };
        
        this._model.findOneAndUpdate(filter, data, options, (err, newItem) => {
            if (err != null && newItem != null)
                this._logger.trace(correlationId, "Removed reference in %s from id = %s", this._collection, id);
           
            if (callback) {
                newItem = this.convertToPublic(newItem);
                callback(err, newItem);
            }
        });
    }
    
}
