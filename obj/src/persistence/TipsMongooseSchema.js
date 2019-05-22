"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.TipsMongooseSchema = function (collection) {
    collection = collection || 'tips';
    let attachmentSchema = new mongoose_1.Schema({
        id: { type: String, required: false },
        url: { type: String, required: false },
        name: { type: String, required: false }
    });
    attachmentSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    let partyReferenceSchema = new mongoose_1.Schema({
        id: { type: String, required: false },
        name: { type: String, required: false },
        email: { type: String, required: false }
    });
    partyReferenceSchema.set('toJSON', {
        transform: function (doc, ret) {
            //ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    let schema = new mongoose_1.Schema({
        /* Identification */
        _id: { type: String, unique: true },
        topics: { type: [String], required: false },
        /* Automatically managed fields */
        creator: { type: attachmentSchema, required: false },
        create_time: { type: Date, required: true, 'default': Date.now },
        /* Content */
        title: { type: Mixed, required: false },
        content: { type: Mixed, required: true },
        more_url: { type: String, required: false },
        pics: { type: [attachmentSchema], required: false },
        docs: { type: [attachmentSchema], required: false },
        /* Search  */
        tags: { type: [String], required: false },
        all_tags: { type: [String], required: false, index: true },
        /* Status */
        status: { type: String, required: true, 'default': 'new' },
        /* Custom fields */
        custom_hdr: { type: Mixed, required: false },
        custom_dat: { type: Mixed, required: false }
    }, {
        collection: collection,
        autoIndex: true,
        strict: true
    });
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=TipsMongooseSchema.js.map