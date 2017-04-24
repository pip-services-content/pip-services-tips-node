import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { AttachmentsServiceFactory } from '../build/AttachmentsServiceFactory';

export class AttachmentsProcess extends ProcessContainer {

    public constructor() {
        super("attachments", "Blob attachments microservice");
        this._factories.add(new AttachmentsServiceFactory);
    }


}
