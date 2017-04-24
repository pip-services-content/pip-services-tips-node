import { IGetter } from 'pip-services-data-node';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
export interface IAttachmentsPersistence extends IGetter<BlobAttachmentV1, string> {
    getOneById(correlation_id: string, id: string, callback: (err: any, item: BlobAttachmentV1) => void): void;
    addReference(correlation_id: string, id: string, reference: ReferenceV1, callback?: (err: any, item: BlobAttachmentV1) => void): void;
    removeReference(correlation_id: string, id: string, reference: ReferenceV1, callback?: (err: any, item: BlobAttachmentV1) => void): void;
    deleteById(correlation_id: string, id: string, callback?: (err: any, item: BlobAttachmentV1) => void): void;
}
