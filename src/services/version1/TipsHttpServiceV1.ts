import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class TipsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('tips');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-tips', 'controller', 'default', '*', '1.0'));
    }
}