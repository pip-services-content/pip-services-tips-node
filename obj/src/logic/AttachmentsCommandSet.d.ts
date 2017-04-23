import { CommandSet } from 'pip-services-commons-node';
import { IAttachmentsController } from './IAttachmentsController';
export declare class AttachmentsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IAttachmentsController);
    private makeGetAttachmentByIdCommand();
    private makeAddAttachmentsCommand();
    private makeUpdateAttachmentsCommand();
    private makeRemoveAttachmentsCommand();
    private makeDeleteAttachmentByIdCommand();
}
