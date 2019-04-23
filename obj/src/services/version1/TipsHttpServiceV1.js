"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class TipsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/tips');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-tips', 'controller', 'default', '*', '1.0'));
    }
}
exports.TipsHttpServiceV1 = TipsHttpServiceV1;
//# sourceMappingURL=TipsHttpServiceV1.js.map