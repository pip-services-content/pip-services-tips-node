import { IGetter } from 'pip-services-data-node';

import { AttachmentV1 } from '../data/version1/AttachmentV1';
import { ReferenceV1 } from '../data/version1/ReferenceV1';

export interface IAttachmentsPersistence extends IGetter<AttachmentV1, string>
{
    getOneById(correlation_id: string, id: string, 
        callback: (err: any, item: AttachmentV1) => void): void;

    addReference(correlation_id: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: AttachmentV1) => void): void;

    removeReference(correlation_id: string, id: string, reference: ReferenceV1, 
        callback?: (err: any, item: AttachmentV1) => void): void;
    
    deleteById(correlation_id: string, id: string, 
        callback?: (err: any, item: AttachmentV1) => void): void;
}
