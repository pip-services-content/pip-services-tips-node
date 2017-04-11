import { CommandSet } from 'pip-services-commons-node';
import { IAttachmentsBusinessLogic } from './IAttachmentsBusinessLogic';
export declare class AttachmentsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IAttachmentsBusinessLogic);
    private makeGetAttachmentByIdCommand();
    private makeAddAttachmentsCommand();
    private makeUpdateAttachmentsCommand();
    private makeRemoveAttachmentsCommand();
    private makeDeleteAttachmentByIdCommand();
}
