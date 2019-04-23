import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { TipsServiceFactory } from '../build/TipsServiceFactory';

export class TipsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("tips", "User tips function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-tips', 'controller', 'default', '*', '*'));
        this._factories.add(new TipsServiceFactory());
    }
}

export const handler = new TipsLambdaFunction().getHandler();