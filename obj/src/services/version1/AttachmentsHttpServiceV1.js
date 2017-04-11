"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class AttachmentsHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('attachments');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-attachments', 'controller', 'default', '*', '1.0'));
    }
}
exports.AttachmentsHttpServiceV1 = AttachmentsHttpServiceV1;
//# sourceMappingURL=AttachmentsHttpServiceV1.js.map