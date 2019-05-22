import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { IdentifiableMongoosePersistence } from 'pip-services3-mongoose-node';
import { TipV1 } from '../data/version1/TipV1';
import { ITipsPersistence } from './ITipsPersistence';
export declare class TipsMongoDbPersistence extends IdentifiableMongoosePersistence<TipV1, string> implements ITipsPersistence {
    constructor();
    private composeFilter(filter);
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: any): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: TipV1) => void): void;
}
