let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services-data-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentsV1 } from '../data/version1/BlobAttachmentsV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';

export class AttachmentsMemoryPersistence 
    extends IdentifiableMemoryPersistence<BlobAttachmentsV1, string> 
    implements IAttachmentsPersistence {

    constructor() {
        super();
    }

    public addReference(correlationId: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentsV1) => void): void {
        let item: BlobAttachmentsV1 = _.find(this._items, (x) => x.id == id);

        if (item != null) {
            item.references.push(reference)
        } else {
            item = new BlobAttachmentsV1(id, [reference]);
            this._items.push(item);
        }

        this._logger.trace(correlationId, "Added reference to %s", id);

        this.save(correlationId, (err) => {
            if (callback) callback(err, item)
        });
    }

    public removeReference(correlationId: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentsV1) => void): void {
        let item: BlobAttachmentsV1 = _.find(this._items, (x) => x.id == id);
        
        let removed = false;
        if (item != null) {
            let index = _.findIndex(item.references, (r) => {
                return r.id == reference.id && r.type == reference.type;
            });

            if (index >= 0) {
                item.references.splice(index, 1);
                removed = true;
            }
        }

        if (removed) {
            this._logger.trace(correlationId, "Removed reference to %s", id);

            this.save(correlationId, (err) => {
                if (callback) callback(err, item)
            });
        } else {
            callback(null, item);
        }
    }

}
