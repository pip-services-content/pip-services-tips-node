import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { AttachmentsMemoryPersistence } from './AttachmentsMemoryPersistence';
import { BlobAttachmentsV1 } from '../data/version1/BlobAttachmentsV1';
export declare class AttachmentsFilePersistence extends AttachmentsMemoryPersistence {
    protected _persister: JsonFilePersister<BlobAttachmentsV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
