import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { BlobAttachmentsV1 } from '../data/version1/BlobAttachmentsV1';

export interface IAttachmentsController {
    getAttachmentById(correlationId: string, id: string,
        callback: (err: any, attachment: BlobAttachmentsV1) => void): void;
    
    addAttachments(correlationId: string, reference: ReferenceV1, ids: string[],
        callback?: (err: any, attachments: BlobAttachmentsV1[]) => void): void;

    updateAttachments(correlationId: string, reference: ReferenceV1, oldIds: string[], newIds: string[],
        callback?: (err: any, attachments: BlobAttachmentsV1[]) => void): void;

    removeAttachments(correlationId: string, reference: ReferenceV1, ids: string[],
        callback?: (err: any, attachments: BlobAttachmentsV1[]) => void): void;

    deleteAttachmentById(correlationId: string, id: string,
        callback?: (err: any, attachment: BlobAttachmentsV1) => void): void;
}
