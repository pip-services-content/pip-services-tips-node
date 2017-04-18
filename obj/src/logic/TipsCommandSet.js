"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const pip_services_commons_node_7 = require("pip-services-commons-node");
const pip_services_commons_node_8 = require("pip-services-commons-node");
const TipV1Schema_1 = require("../data/version1/TipV1Schema");
class TipsCommandSet extends pip_services_commons_node_1.CommandSet {
    constructor(logic) {
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
    makeGetTipsCommand() {
        return new pip_services_commons_node_2.Command("get_tips", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getTips(correlationId, filter, paging, callback);
        });
    }
    makeGetRandomTipCommand() {
        return new pip_services_commons_node_2.Command("get_random_tip", new pip_services_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services_commons_node_7.FilterParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services_commons_node_3.FilterParams.fromValue(args.get("filter"));
            this._logic.getRandomTip(correlationId, filter, callback);
        });
    }
    makeGetTipByIdCommand() {
        return new pip_services_commons_node_2.Command("get_tip_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('tip_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let tipId = args.getAsNullableString("tip_id");
            this._logic.getTipById(correlationId, tipId, callback);
        });
    }
    makeCreateTipCommand() {
        return new pip_services_commons_node_2.Command("create_tip", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('tip', new TipV1Schema_1.TipV1Schema()), (correlationId, args, callback) => {
            let tip = args.get("tip");
            this._logic.createTip(correlationId, tip, callback);
        });
    }
    makeUpdateTipCommand() {
        return new pip_services_commons_node_2.Command("update_tip", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('tip', new TipV1Schema_1.TipV1Schema()), (correlationId, args, callback) => {
            let tip = args.get("tip");
            this._logic.updateTip(correlationId, tip, callback);
        });
    }
    makeDeleteTipByIdCommand() {
        return new pip_services_commons_node_2.Command("delete_tip_by_id", new pip_services_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('tip_id', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let tipId = args.getAsNullableString("tip_id");
            this._logic.deleteTipById(correlationId, tipId, callback);
        });
    }
}
exports.TipsCommandSet = TipsCommandSet;
//# sourceMappingURL=TipsCommandSet.js.map