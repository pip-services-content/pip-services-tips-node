import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { AttachmentV1 } from '../data/version1/AttachmentV1';

export interface IAttachmentsBusinessLogic {
    getAttachmentById(correlationId: string, id: string,
        callback: (err: any, attachment: AttachmentV1) => void): void;
    
    addAttachments(correlationId: string, reference: ReferenceV1, ids: string[],
        callback?: (err: any, attachments: AttachmentV1[]) => void): void;

    updateAttachments(correlationId: string, reference: ReferenceV1, oldIds: string[], newIds: string[],
        callback?: (err: any, attachments: AttachmentV1[]) => void): void;

    removeAttachments(correlationId: string, reference: ReferenceV1, ids: string[],
        callback?: (err: any, attachments: AttachmentV1[]) => void): void;

    deleteAttachmentById(correlationId: string, id: string,
        callback?: (err: any, attachment: AttachmentV1) => void): void;
}
