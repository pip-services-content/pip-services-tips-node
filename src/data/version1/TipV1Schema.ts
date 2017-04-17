import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

import { PartyReferenceV1Schema } from './PartyReferenceV1Schema';
import { DocumentReferenceV1Schema } from './DocumentReferenceV1Schema';

export class TipV1Schema extends ObjectSchema {
    public constructor() {
        super();
    
        /* Identification */
        this.withOptionalProperty('id', TypeCode.String);
        this.withRequiredProperty('topics', new ArraySchema(TypeCode.String));

        /* Generic request properties */
        this.withRequiredProperty('creator', new PartyReferenceV1Schema());
        this.withOptionalProperty('create_time', null); //TypeCode.DateTime);

        /* Common properties */
        this.withOptionalProperty('title', TypeCode.Map);
        this.withOptionalProperty('content', TypeCode.Map);
        this.withOptionalProperty('more_url', TypeCode.String);
        this.withOptionalProperty('pic_ids', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('docs', new ArraySchema(new DocumentReferenceV1Schema()));

        /* Search */
        this.withOptionalProperty('tags', new ArraySchema(TypeCode.String));
        this.withOptionalProperty('all_tags', new ArraySchema(TypeCode.String));

        /* Status */
        this.withOptionalProperty('status', TypeCode.String);

        /* Custom fields */
        this.withOptionalProperty('custom_hdr', null);
        this.withOptionalProperty('custom_dat', null);
    }
}
