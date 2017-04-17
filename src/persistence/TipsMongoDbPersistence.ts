let _ = require('lodash');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { AnyValueMap } from 'pip-services-commons-node';
import { TagsProcessor } from 'pip-services-commons-node';
import { IdentifiableMongoDbPersistence } from 'pip-services-data-node';

import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { TipV1 } from '../data/version1/TipV1';
import { ITipsPersistence } from './ITipsPersistence';
import { TipsMongoDbSchema } from './TipsMongoDbSchema';

export class TipsMongoDbPersistence 
    extends IdentifiableMongoDbPersistence<TipV1, string> 
    implements ITipsPersistence {

    constructor() {
        super('tips', TipsMongoDbSchema());
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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
            let tags = TagsProcessor.compressTags(tagsString);
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

    public getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any) {
        super.getPageByFilter(correlationId, this.composeFilter(filter), paging, '-time', null, callback);
    }

    public getOneRandom(correlationId: string, filter: FilterParams,
        callback: (err: any, item: TipV1) => void): void {
        super.getOneRandom(correlationId, this.composeFilter(filter), callback);
    }

}
