"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_mongodb_node_1 = require("pip-services-mongodb-node");
const TipsMongoDbSchema_1 = require("./TipsMongoDbSchema");
class TipsMongoDbPersistence extends pip_services_mongodb_node_1.IdentifiableMongoDbPersistence {
    constructor() {
        super('tips', TipsMongoDbSchema_1.TipsMongoDbSchema());
    }
    composeFilter(filter) {
        filter = filter || new pip_services_commons_node_1.FilterParams();
        let criteria = [];
        let search = filter.getAsNullableString('search');
        if (search != null) {
            let searchRegex = new RegExp(search, "i");
            let searchCriteria = [];
            searchCriteria.push({ 'title.en': { $regex: searchRegex } });
            searchCriteria.push({ 'title.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'title.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'title.de': { $regex: searchRegex } });
            searchCriteria.push({ 'title.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'content.en': { $regex: searchRegex } });
            searchCriteria.push({ 'content.sp': { $regex: searchRegex } });
            searchCriteria.push({ 'content.fr': { $regex: searchRegex } });
            searchCriteria.push({ 'content.de': { $regex: searchRegex } });
            searchCriteria.push({ 'content.ru': { $regex: searchRegex } });
            searchCriteria.push({ 'creator.name': { $regex: searchRegex } });
            criteria.push({ $or: searchCriteria });
        }
        let id = filter.getAsNullableString('id');
        if (id != null)
            criteria.push({ _id: id });
        let topicsString = filter.get('topics');
        if (topicsString) {
            let topics = topicsString.split(',');
            criteria.push({ topics: { $in: topics } });
        }
        let status = filter.getAsNullableString('status');
        if (status != null)
            criteria.push({ status: status });
        // Search by tags
        let tagsString = filter.getAsObject('tags');
        if (tagsString) {
            let tags = pip_services_commons_node_2.TagsProcessor.compressTags([tagsString]);
            criteria.push({ all_tags: { $in: tags } });
        }
        let fromCreateTime = filter.getAsNullableDateTime('from_create_time');
        if (fromCreateTime != null)
            criteria.push({ create_time: { $gte: fromCreateTime } });
        let toCreateTime = filter.getAsNullableDateTime('to_create_time');
        if (toCreateTime != null)
            criteria.push({ create_time: { $lt: toCreateTime } });
        return criteria.length > 0 ? { $and: criteria } : {};
    }
    getPageByFilter(correlationId, filter, paging, callback) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-create_time', null, callback);
    }
    getOneRandom(correlationId, filter, callback) {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }
}
exports.TipsMongoDbPersistence = TipsMongoDbPersistence;
//# sourceMappingURL=TipsMongoDbPersistence.js.map