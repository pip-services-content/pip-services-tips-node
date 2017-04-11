"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const AttachmentsFactory_1 = require("../build/AttachmentsFactory");
class AttachmentsProcess extends pip_services_container_node_1.ProcessContainer {
    initReferences(references) {
        super.initReferences(references);
        // Factory to statically resolve attachments components
        references.put(AttachmentsFactory_1.AttachmentsFactory.Descriptor, new AttachmentsFactory_1.AttachmentsFactory());
    }
    runWithArguments(args) {
        return this.runWithArgumentsOrConfigFile("attachments", args, "./config/config.yaml");
    }
}
exports.AttachmentsProcess = AttachmentsProcess;
//# sourceMappingURL=AttachmentsProcess.js.map