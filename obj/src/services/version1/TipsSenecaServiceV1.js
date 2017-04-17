"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class TipsSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('tips');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-tips', 'controller', 'default', '*', '1.0'));
    }
}
exports.TipsSenecaServiceV1 = TipsSenecaServiceV1;
//# sourceMappingURL=TipsSenecaServiceV1.js.map