import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-seneca-node';

export class TipsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('tips');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-tips', 'controller', 'default', '*', '1.0'));
    }
}