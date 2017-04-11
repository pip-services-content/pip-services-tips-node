import { ConfigParams } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';
import { AttachmentsMemoryPersistence } from './AttachmentsMemoryPersistence';
import { AttachmentsV1 } from '../data/version1/AttachmentsV1';
export declare class AttachmentsFilePersistence extends AttachmentsMemoryPersistence {
    protected _persister: JsonFilePersister<AttachmentsV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
