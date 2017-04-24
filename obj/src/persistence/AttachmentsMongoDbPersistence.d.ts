import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';
export declare class AttachmentsMongoDbPersistence extends IdentifiableMongoDbPersistence<BlobAttachmentV1, string> implements IAttachmentsPersistence {
    constructor();
    addReference(correlationId: string, id: string, reference: ReferenceV1, callback?: (err: any, item: BlobAttachmentV1) => void): void;
    removeReference(correlationId: string, id: string, reference: ReferenceV1, callback?: (err: any, item: BlobAttachmentV1) => void): void;
}
