import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class AttachmentsSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('attachments');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-attachments', 'controller', 'default', '*', '1.0'));
    }
}