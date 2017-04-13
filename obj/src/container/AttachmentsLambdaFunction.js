"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_aws_node_1 = require("pip-services-aws-node");
const AttachmentsFactory_1 = require("../build/AttachmentsFactory");
class AttachmentsLambdaFunction extends pip_services_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("attachments", "File attachments function");
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-attachments', 'controller', 'default', '*', '*'));
        this._factories.add(new AttachmentsFactory_1.AttachmentsFactory());
    }
}
exports.AttachmentsLambdaFunction = AttachmentsLambdaFunction;
exports.handler = new AttachmentsLambdaFunction().getHandler();
//# sourceMappingURL=AttachmentsLambdaFunction.js.map