import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { AttachmentsV1 } from '../data/version1/AttachmentsV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';
export declare class AttachmentsMongoDbPersistence extends IdentifiableMongoDbPersistence<AttachmentsV1, string> implements IAttachmentsPersistence {
    constructor();
    addReference(correlationId: string, id: string, reference: ReferenceV1, callback?: (err: any, item: AttachmentsV1) => void): void;
    removeReference(correlationId: string, id: string, reference: ReferenceV1, callback?: (err: any, item: AttachmentsV1) => void): void;
}
