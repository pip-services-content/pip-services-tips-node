import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { AttachmentsV1 } from '../data/version1/AttachmentsV1';
export interface IAttachmentsBusinessLogic {
    getAttachmentById(correlationId: string, id: string, callback: (err: any, attachments: AttachmentsV1) => void): void;
    addAttachments(correlationId: string, reference: ReferenceV1, ids: string[], callback?: (err: any, attachments: AttachmentsV1[]) => void): void;
    updateAttachments(correlationId: string, reference: ReferenceV1, oldIds: string[], newIds: string[], callback?: (err: any, attachments: AttachmentsV1[]) => void): void;
    removeAttachments(correlationId: string, reference: ReferenceV1, ids: string[], callback?: (err: any, attachments: AttachmentsV1[]) => void): void;
    deleteAttachmentById(correlationId: string, id: string, callback?: (err: any, attachments: AttachmentsV1) => void): void;
}
