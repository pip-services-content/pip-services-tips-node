"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_data_node_1 = require("pip-services-data-node");
const BlobAttachmentMongoDbSchema_1 = require("./BlobAttachmentMongoDbSchema");
class AttachmentsMongoDbPersistence extends pip_services_data_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('attachments', BlobAttachmentMongoDbSchema_1.BlobAttachmentMongoDbSchema());
    }
    addReference(correlationId, id, reference, callback) {
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
        };
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
    removeReference(correlationId, id, reference, callback) {
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
        };
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
exports.AttachmentsMongoDbPersistence = AttachmentsMongoDbPersistence;
//# sourceMappingURL=AttachmentsMongoDbPersistence.js.map