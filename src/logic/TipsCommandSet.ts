import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';
import { FilterParamsSchema } from 'pip-services-commons-node';
import { PagingParamsSchema } from 'pip-services-commons-node';

import { TipV1 } from '../data/version1/TipV1';
import { PartyReferenceV1Schema } from '../data/version1/PartyReferenceV1Schema';
import { TipV1Schema } from '../data/version1/TipV1Schema';
import { ITipsBusinessLogic } from './ITipsBusinessLogic';

export class TipsCommandSet extends CommandSet {
    private _logic: ITipsBusinessLogic;

	constructor(logic: ITipsBusinessLogic) {
		super();

		this._logic = logic;

		// Register commands to the database
		this.addCommand(this.makeGetTipsCommand());
		this.addCommand(this.makeGetRandomTipCommand());
		this.addCommand(this.makeGetTipByIdCommand());
		this.addCommand(this.makeCreateTipCommand());
		this.addCommand(this.makeUpdateTipCommand());
		this.addCommand(this.makeDeleteTipByIdCommand());
	}

	private makeGetTipsCommand(): ICommand {
		return new Command(
			"get_tips",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				let paging = PagingParams.fromValue(args.get("paging"));
				this._logic.getTips(correlationId, filter, paging, callback);
			}
		);
	}

	private makeGetRandomTipCommand(): ICommand {
		return new Command(
			"get_random_tip",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let filter = FilterParams.fromValue(args.get("filter"));
				this._logic.getRandomTip(correlationId, filter, callback);
			}
		);
	}

	private makeGetTipByIdCommand(): ICommand {
		return new Command(
			"get_tip_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('tip_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let tipId = args.getAsNullableString("tip_id");
				this._logic.getTipById(correlationId, tipId, callback);
			}
		);
	}

	private makeCreateTipCommand(): ICommand {
		return new Command(
			"create_tip",
			new ObjectSchema(true)
				.withRequiredProperty('tip', new TipV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let tip = args.get("tip");
				this._logic.createTip(correlationId, tip, callback);
			}
		);
	}

	private makeUpdateTipCommand(): ICommand {
		return new Command(
			"update_tip",
			new ObjectSchema(true)
				.withRequiredProperty('tip', new TipV1Schema()),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let tip = args.get("tip");
				this._logic.updateTip(correlationId, tip, callback);
			}
		);
	}

	private makeDeleteTipByIdCommand(): ICommand {
		return new Command(
			"delete_tip_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('tip_id', TypeCode.String),
			(correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
				let tipId = args.getAsNullableString("tip_id");
				this._logic.deleteTipById(correlationId, tipId, callback);
			}
		);
	}

}