"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const AttachmentsCommandSet_1 = require("./AttachmentsCommandSet");
class AttachmentsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(AttachmentsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new AttachmentsCommandSet_1.AttachmentsCommandSet(this);
        return this._commandSet;
    }
    getAttachmentById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    addAttachments(correlationId, reference, ids, callback) {
        let attachments = [];
        async.each(ids, (id, callback) => {
            this._persistence.addReference(correlationId, id, reference, (err, attachment) => {
                if (attachment)
                    attachments.push(attachment);
                callback(err);
            });
        }, (err) => {
            if (callback)
                callback(err, attachments);
        });
    }
    updateAttachments(correlationId, reference, oldIds, newIds, callback) {
        let attachments = [];
        async.parallel([
            // Remove obsolete ids
            (callback) => {
                let ids = _.difference(oldIds, newIds);
                if (ids.length > 0) {
                    this.removeAttachments(correlationId, reference, ids, (err, removedAttachments) => {
                        _.each(removedAttachments, (a) => {
                            attachments.push(a);
                        });
                        callback(err);
                    });
                }
                else
                    callback(null);
            },
            // Add new ids
            (callback) => {
                let ids = _.difference(newIds, oldIds);
                if (ids.length > 0) {
                    this.addAttachments(correlationId, reference, ids, (err, addAttachments) => {
                        _.each(addAttachments, (a) => {
                            attachments.push(a);
                        });
                        callback(err);
                    });
                }
                else
                    callback(null);
            }
        ], (err) => {
            if (callback)
                callback(err, attachments);
        });
    }
    removeAttachments(correlationId, reference, ids, callback) {
        let attachments = [];
        async.each(ids, (id, callback) => {
            this._persistence.removeReference(correlationId, id, reference, (err, attachment) => {
                if (attachment)
                    attachments.push(attachment);
                callback(err);
            });
        }, (err) => {
            if (callback)
                callback(err, attachments);
        });
    }
    deleteAttachmentById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
AttachmentsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-attachments:persistence:*:*:1.0');
exports.AttachmentsController = AttachmentsController;
//# sourceMappingURL=AttachmentsController.js.map