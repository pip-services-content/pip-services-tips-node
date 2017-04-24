"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const AttachmentsServiceFactory_1 = require("../build/AttachmentsServiceFactory");
class AttachmentsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory_1.AttachmentsServiceFactory);
    }
}
exports.AttachmentsProcess = AttachmentsProcess;
//# sourceMappingURL=AttachmentsProcess.js.map