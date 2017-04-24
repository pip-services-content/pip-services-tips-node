import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { AttachmentsServiceFactory } from '../build/AttachmentsServiceFactory';

export class AttachmentsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("attachments", "Blob attachments function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-attachments', 'controller', 'default', '*', '*'));
        this._factories.add(new AttachmentsServiceFactory());
    }
}

export const handler = new AttachmentsLambdaFunction().getHandler();