import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';
import { AttachmentsFactory } from '../build/AttachmentsFactory';

export class AttachmentsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("attachments", "File attachments function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-attachments', 'controller', 'default', '*', '*'));
        this._factories.add(new AttachmentsFactory());
    }
}

export const handler = new AttachmentsLambdaFunction().getHandler();