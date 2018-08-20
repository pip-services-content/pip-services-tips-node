"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const TipsCommandSet_1 = require("./TipsCommandSet");
const AttachmentsConnector_1 = require("./AttachmentsConnector");
class TipsController {
    constructor() {
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(TipsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
        this._attachmentsClient = this._dependencyResolver.getOneOptional('attachments');
        this._attachmentsConnector = new AttachmentsConnector_1.AttachmentsConnector(this._attachmentsClient);
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new TipsCommandSet_1.TipsCommandSet(this);
        return this._commandSet;
    }
    getTips(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getRandomTip(correlationId, filter, callback) {
        this._persistence.getOneRandom(correlationId, filter, callback);
    }
    getTipById(correlationId, tipId, callback) {
        this._persistence.getOneById(correlationId, tipId, callback);
    }
    createTip(correlationId, tip, callback) {
        let newTip = null;
        tip.create_time = new Date();
        tip.all_tags = pip_services_commons_node_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
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
    updateTip(correlationId, tip, callback) {
        let oldTip = null;
        let newTip = null;
        tip.all_tags = pip_services_commons_node_3.TagsProcessor.extractHashTags('#title.en#title.sp#title.fr#title.de#title.ru#content.en#content.sp#content.fr#content.de#content.ru');
        async.series([
            (callback) => {
                this._persistence.getOneById(correlationId, tip.id, (err, data) => {
                    oldTip = data;
                    if (err == null && data == null) {
                        err = new pip_services_commons_node_4.NotFoundException(correlationId, 'TIP_NOT_FOUND', 'Tip ' + tip.id + ' was not found').withDetails('tip_id', tip.id);
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
                this._attachmentsConnector.updateAttachments(correlationId, oldTip, newTip, callback);
            }
        ], (err) => {
            callback(err, newTip);
        });
    }
    deleteTipById(correlationId, tipId, callback) {
        let oldTip = null;
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
TipsController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'pip-services-tips:persistence:*:*:1.0', 'dependencies.attachments', 'pip-services-attachments:client:*:*:1.0');
exports.TipsController = TipsController;
//# sourceMappingURL=TipsController.js.map