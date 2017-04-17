"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_container_node_1 = require("pip-services-container-node");
const TipsFactory_1 = require("../build/TipsFactory");
class TipsProcess extends pip_services_container_node_1.ProcessContainer {
    constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsFactory_1.TipsFactory);
    }
}
exports.TipsProcess = TipsProcess;
//# sourceMappingURL=TipsProcess.js.map