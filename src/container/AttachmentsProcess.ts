import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { AttachmentsFactory } from '../build/AttachmentsFactory';

export class AttachmentsProcess extends ProcessContainer {

    protected initReferences(references: IReferences): void {
        super.initReferences(references);

        // Factory to statically resolve attachments components
        references.put(AttachmentsFactory.Descriptor, new AttachmentsFactory());
    }

    public runWithArguments(args: string[]): void {
        return this.runWithArgumentsOrConfigFile("attachments", args, "./config/config.yaml");
    }

}
