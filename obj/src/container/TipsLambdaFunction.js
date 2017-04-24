"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const TipsServiceFactory_1 = require("../build/TipsServiceFactory");
class TipsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("tips", "User tips function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-tips', 'controller', 'default', '*', '*'));
        this._factories.add(new TipsServiceFactory_1.TipsServiceFactory());
    }
}
exports.TipsLambdaFunction = TipsLambdaFunction;
exports.handler = new TipsLambdaFunction().getHandler();
//# sourceMappingURL=TipsLambdaFunction.js.map