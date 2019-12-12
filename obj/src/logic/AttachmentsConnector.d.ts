import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';
import { TipV1 } from '../data/version1/TipV1';
export declare class AttachmentsConnector {
    private _attachmentsClient;
    constructor(_attachmentsClient: IAttachmentsClientV1);
    private extractAttachmentIds;
    addAttachments(correlationId: string, tip: TipV1, callback: (err: any) => void): void;
    updateAttachments(correlationId: string, oldTip: TipV1, newTip: TipV1, callback: (err: any) => void): void;
    removeAttachments(correlationId: string, tip: TipV1, callback: (err: any) => void): void;
}
