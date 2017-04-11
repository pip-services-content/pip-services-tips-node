import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { AttachmentsMemoryPersistence } from './AttachmentsMemoryPersistence';
import { AttachmentV1 } from '../data/version1/AttachmentV1';
export declare class AttachmentsFilePersistence extends AttachmentsMemoryPersistence {
    protected _persister: JsonFilePersister<AttachmentV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
