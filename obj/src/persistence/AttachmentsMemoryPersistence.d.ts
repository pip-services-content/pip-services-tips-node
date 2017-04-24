import { IdentifiableMemoryPersistence } from 'pip-services-data-node';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentsV1 } from '../data/version1/BlobAttachmentsV1';
import { IAttachmentsPersistence } from './IAttachmentsPersistence';
export declare class AttachmentsMemoryPersistence extends IdentifiableMemoryPersistence<BlobAttachmentsV1, string> implements IAttachmentsPersistence {
    constructor();
    addReference(correlationId: string, id: string, reference: ReferenceV1, callback?: (err: any, item: BlobAttachmentsV1) => void): void;
    removeReference(correlationId: string, id: string, reference: ReferenceV1, callback?: (err: any, item: BlobAttachmentsV1) => void): void;
}
