"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const PartyReferenceV1Schema_1 = require("./PartyReferenceV1Schema");
const AttachmentV1Schema_1 = require("./AttachmentV1Schema");
class TipV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        /* Identification */
        this.withOptionalProperty('id', pip_services_commons_node_3.TypeCode.String);
        this.withRequiredProperty('topics', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        /* Generic request properties */
        this.withRequiredProperty('creator', new PartyReferenceV1Schema_1.PartyReferenceV1Schema());
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);
        /* Common properties */
        this.withOptionalProperty('title', pip_services_commons_node_3.TypeCode.Map);
        this.withOptionalProperty('content', pip_services_commons_node_3.TypeCode.Map);
        this.withOptionalProperty('more_url', pip_services_commons_node_3.TypeCode.String);
        this.withOptionalProperty('pics', new pip_services_commons_node_2.ArraySchema(new AttachmentV1Schema_1.AttachmentV1Schema()));
        this.withOptionalProperty('docs', new pip_services_commons_node_2.ArraySchema(new AttachmentV1Schema_1.AttachmentV1Schema()));
        /* Search */
        this.withOptionalProperty('tags', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        this.withOptionalProperty('all_tags', new pip_services_commons_node_2.ArraySchema(pip_services_commons_node_3.TypeCode.String));
        /* Status */
        this.withOptionalProperty('status', pip_services_commons_node_3.TypeCode.String);
        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
exports.TipV1Schema = TipV1Schema;
//# sourceMappingURL=TipV1Schema.js.map