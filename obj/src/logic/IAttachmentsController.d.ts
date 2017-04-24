import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentV1 } from '../data/version1/BlobAttachmentV1';
export interface IAttachmentsController {
    getAttachmentById(correlationId: string, id: string, callback: (err: any, attachment: BlobAttachmentV1) => void): void;
    addAttachments(correlationId: string, reference: ReferenceV1, ids: string[], callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void;
    updateAttachments(correlationId: string, reference: ReferenceV1, oldIds: string[], newIds: string[], callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void;
    removeAttachments(correlationId: string, reference: ReferenceV1, ids: string[], callback?: (err: any, attachments: BlobAttachmentV1[]) => void): void;
    deleteAttachmentById(correlationId: string, id: string, callback?: (err: any, attachment: BlobAttachmentV1) => void): void;
}
