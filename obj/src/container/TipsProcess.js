"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_oss_node_1 = require("pip-services-oss-node");
const TipsServiceFactory_1 = require("../build/TipsServiceFactory");
class TipsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsServiceFactory_1.TipsServiceFactory);
        this._factories.add(new pip_services_net_node_1.DefaultNetFactory);
        this._factories.add(new pip_services_oss_node_1.DefaultOssFactory);
    }
}
exports.TipsProcess = TipsProcess;
//# sourceMappingURL=TipsProcess.js.map