"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_clients_attachments_node_1 = require("pip-clients-attachments-node");
class AttachmentsConnector {
    constructor(_attachmentsClient) {
        this._attachmentsClient = _attachmentsClient;
    }
    extractAttachmentIds(tip) {
        let ids = [];
        _.each(tip.pics, (pic) => {
            if (pic.id)
                ids.push(pic.id);
        });
        _.each(tip.docs, (doc) => {
            if (doc.id)
                ids.push(doc.id);
        });
        return ids;
    }
    addAttachments(correlationId, tip, callback) {
        if (this._attachmentsClient == null || tip == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(tip);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(tip.id, 'tip');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
    updateAttachments(correlationId, oldTip, newTip, callback) {
        if (this._attachmentsClient == null || oldTip == null || newTip == null) {
            callback(null);
            return;
        }
        let oldIds = this.extractAttachmentIds(oldTip);
        let newIds = this.extractAttachmentIds(newTip);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(newTip.id, 'tip');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        });
    }
    removeAttachments(correlationId, tip, callback) {
        if (this._attachmentsClient == null || tip == null) {
            callback(null);
            return;
        }
        let ids = this.extractAttachmentIds(tip);
        let reference = new pip_clients_attachments_node_1.ReferenceV1(tip.id, 'tip');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        });
    }
}
exports.AttachmentsConnector = AttachmentsConnector;
//# sourceMappingURL=AttachmentsConnector.js.map