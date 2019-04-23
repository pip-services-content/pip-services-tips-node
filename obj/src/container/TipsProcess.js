"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const TipsServiceFactory_1 = require("../build/TipsServiceFactory");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class TipsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsServiceFactory_1.TipsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.TipsProcess = TipsProcess;
//# sourceMappingURL=TipsProcess.js.map