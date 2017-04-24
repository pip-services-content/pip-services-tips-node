import { IGetter } from 'pip-services-data-node';

import { BlobAttachmentsV1 } from '../data/version1/BlobAttachmentsV1';
import { ReferenceV1 } from '../data/version1/ReferenceV1';

export interface IAttachmentsPersistence extends IGetter<BlobAttachmentsV1, string>
{
    getOneById(correlation_id: string, id: string, 
        callback: (err: any, item: BlobAttachmentsV1) => void): void;

    addReference(correlation_id: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentsV1) => void): void;

    removeReference(correlation_id: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: BlobAttachmentsV1) => void): void;
    
    deleteById(correlation_id: string, id: string, 
        callback?: (err: any, item: BlobAttachmentsV1) => void): void;
}
