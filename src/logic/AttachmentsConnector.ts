let _ = require('lodash');

import { ReferenceV1 } from 'pip-clients-attachments-node';
import { IAttachmentsClientV1 } from 'pip-clients-attachments-node';

import { TipV1 } from '../data/version1/TipV1';

export class AttachmentsConnector {

    public constructor(
        private _attachmentsClient: IAttachmentsClientV1
    ) {}

    private extractAttachmentIds(tip: TipV1): string[] {
        let ids: string[] = [];

        _.each(tip.pics, (pic) => {
            if (pic.id)
                ids.push(pic.id);
        });

        _.each(tip.docs, (doc) => {
            if (doc.id)
                ids.push(doc.id);
        });

        return ids;
    }

    public addAttachments(correlationId: string, tip: TipV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || tip == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(tip);
        let reference = new ReferenceV1(tip.id, 'tip');
        this._attachmentsClient.addAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

    public updateAttachments(correlationId: string, oldTip: TipV1,
        newTip: TipV1, callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || oldTip == null || newTip == null) {
            callback(null);
            return;
        }

        let oldIds = this.extractAttachmentIds(oldTip);
        let newIds = this.extractAttachmentIds(newTip);
        let reference = new ReferenceV1(newTip.id, 'tip');
        this._attachmentsClient.updateAttachments(correlationId, reference, oldIds, newIds, (err) => {
            callback(err);
        })
    }

    public removeAttachments(correlationId: string, tip: TipV1,
        callback: (err: any) => void) : void {
        
        if (this._attachmentsClient == null || tip == null) {
            callback(null);
            return;
        }

        let ids = this.extractAttachmentIds(tip);
        let reference = new ReferenceV1(tip.id, 'tip');
        this._attachmentsClient.removeAttachments(correlationId, reference, ids, (err) => {
            callback(err);
        })
    }

}