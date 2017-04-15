import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { ReferenceV1 } from '../data/version1/ReferenceV1';
import { AttachmentV1 } from '../data/version1/AttachmentV1';
import { IAttachmentsBusinessLogic } from './IAttachmentsBusinessLogic';
export declare class AttachmentsController implements IConfigurable, IReferenceable, ICommandable, IAttachmentsBusinessLogic {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _blobsClient;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getAttachmentById(correlationId: string, id: string, callback: (err: any, attachment: AttachmentV1) => void): void;
    addAttachments(correlationId: string, reference: ReferenceV1, ids: string[], callback?: (err: any, attachments: AttachmentV1[]) => void): void;
    updateAttachments(correlationId: string, reference: ReferenceV1, oldIds: string[], newIds: string[], callback?: (err: any, attachments: AttachmentV1[]) => void): void;
    removeAttachments(correlationId: string, reference: ReferenceV1, ids: string[], callback?: (err: any, attachments: AttachmentV1[]) => void): void;
    deleteAttachmentById(correlationId: string, id: string, callback?: (err: any, attachment: AttachmentV1) => void): void;
}
