import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { AttachmentV1 } from '../data/version1/AttachmentV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';
export declare class AttachmentsMongoDbPersistence extends IdentifiableMongoDbPersistence<AttachmentV1, string> implements IAttachmentsPersistence {
    constructor();
    addReference(correlationId: string, id: string, reference: ReferenceV1, callback?: (err: any, item: AttachmentV1) => void): void;
    removeReference(correlationId: string, id: string, reference: ReferenceV1, callback?: (err: any, item: AttachmentV1) => void): void;
}
