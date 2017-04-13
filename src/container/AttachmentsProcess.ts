import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { AttachmentsFactory } from '../build/AttachmentsFactory';

export class AttachmentsProcess extends ProcessContainer {

    public constructor() {
        super("attachments", "File attachments microservice");
        this._factories.add(new AttachmentsFactory);
    }


}
