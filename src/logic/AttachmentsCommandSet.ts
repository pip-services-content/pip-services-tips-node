import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { AttachmentV1 } from '../data/version1/AttachmentV1';
import { IAttachmentsBusinessLogic } from './IAttachmentsBusinessLogic';

export class AttachmentsCommandSet extends CommandSet {
    private _logic: IAttachmentsBusinessLogic;

	constructor(logic: IAttachmentsBusinessLogic) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetAttachmentByIdCommand());
		this.addCommand(this.makeAddAttachmentsCommand());
		this.addCommand(this.makeUpdateAttachmentsCommand());
		this.addCommand(this.makeRemoveAttachmentsCommand());
		this.addCommand(this.makeDeleteAttachmentByIdCommand());
	}

	private makeGetAttachmentByIdCommand(): ICommand {
		return new Command(
			"get_attachment_by_id",
			null,
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let id = args.getAsNullableString("id");
				this._logic.getAttachmentById(correlationId, id, callback);
			}
		);
	}

	private makeAddAttachmentsCommand(): ICommand {
		return new Command(
			"add_attachments",
			null,
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let reference = args.get("reference");
				let ids = args.get("ids");
				this._logic.addAttachments(correlationId, reference, ids, callback);
			}
		);
	}
    
	private makeUpdateAttachmentsCommand(): ICommand {
		return new Command(
			"update_attachments",
			null,
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let reference = args.get("reference");
				let oldIds = args.get("old_ids");
				let newIds = args.get("new_ids");
				this._logic.updateAttachments(correlationId, reference, oldIds, newIds, callback);
			}
		);
	}

	private makeRemoveAttachmentsCommand(): ICommand {
		return new Command(
			"remove_attachments",
			null,
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let reference = args.get("reference");
				let ids = args.get("ids");
				this._logic.removeAttachments(correlationId, reference, ids, callback);
			}
		);
	}

	private makeDeleteAttachmentByIdCommand(): ICommand {
		return new Command(
			"delete_attachment_by_id",
			null,
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let id = args.getAsNullableString("id");
				this._logic.deleteAttachmentById(correlationId, id, callback);
			}
		);
	}

}