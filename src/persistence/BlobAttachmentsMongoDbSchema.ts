import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let BlobAttachmentsMongoDbSchema = function(collection?: string) {
    collection = collection || 'attachments';

    let schema = new Schema(
        {
            _id: { type: String, unique: true },
            references: { type: Mixed, required: false }
        },
        {
            collection: collection,
            autoIndex: true,
            strict: true
        }
    );

    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });

    return schema;
}
