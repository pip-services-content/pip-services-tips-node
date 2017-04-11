"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class AttachmentsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetAttachmentByIdCommand());
        this.addCommand(this.makeAddAttachmentsCommand());
        this.addCommand(this.makeUpdateAttachmentsCommand());
        this.addCommand(this.makeRemoveAttachmentsCommand());
        this.addCommand(this.makeDeleteAttachmentByIdCommand());
    }
    makeGetAttachmentByIdCommand() {
        return new pip_services_commons_node_2.Command("get_attachment_by_id", null, (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            this._logic.getAttachmentById(correlationId, id, callback);
        });
    }
    makeAddAttachmentsCommand() {
        return new pip_services_commons_node_2.Command("add_attachments", null, (correlationId, args, callback) => {
            let reference = args.get("reference");
            let ids = args.get("ids");
            this._logic.addAttachments(correlationId, reference, ids, callback);
        });
    }
    makeUpdateAttachmentsCommand() {
        return new pip_services_commons_node_2.Command("update_attachments", null, (correlationId, args, callback) => {
            let reference = args.get("reference");
            let oldIds = args.get("old_ids");
            let newIds = args.get("new_ids");
            this._logic.updateAttachments(correlationId, reference, oldIds, newIds, callback);
        });
    }
    makeRemoveAttachmentsCommand() {
        return new pip_services_commons_node_2.Command("remove_attachments", null, (correlationId, args, callback) => {
            let reference = args.get("reference");
            let ids = args.get("ids");
            this._logic.removeAttachments(correlationId, reference, ids, callback);
        });
    }
    makeDeleteAttachmentByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_attachment_by_id", null, (correlationId, args, callback) => {
            let id = args.getAsNullableString("id");
            this._logic.deleteAttachmentById(correlationId, id, callback);
        });
    }
}
exports.AttachmentsCommandSet = AttachmentsCommandSet;
//# sourceMappingURL=AttachmentsCommandSet.js.map