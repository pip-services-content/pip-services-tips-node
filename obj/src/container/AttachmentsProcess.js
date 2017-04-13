"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const AttachmentsFactory_1 = require("../build/AttachmentsFactory");
class AttachmentsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("attachments", "File attachments microservice");
        this._factories.add(new AttachmentsFactory_1.AttachmentsFactory);
    }
}
exports.AttachmentsProcess = AttachmentsProcess;
//# sourceMappingURL=AttachmentsProcess.js.map