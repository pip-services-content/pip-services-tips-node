import { IGetter } from 'pip-services-data-node';
import { AttachmentsV1 } from '../data/version1/AttachmentsV1';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
export interface IAttachmentsPersistence extends IGetter<AttachmentsV1, string> {
    getOneById(correlation_id: string, id: string, callback: (err: any, item: AttachmentsV1) => void): void;
    addReference(correlation_id: string, id: string, reference: ReferenceV1, callback?: (err: any, item: AttachmentsV1) => void): void;
    removeReference(correlation_id: string, id: string, reference: ReferenceV1, callback?: (err: any, item: AttachmentsV1) => void): void;
    deleteById(correlation_id: string, id: string, callback?: (err: any, item: AttachmentsV1) => void): void;
}
