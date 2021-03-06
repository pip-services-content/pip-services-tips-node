import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { TipV1 } from '../data/version1/TipV1';
import { ITipsPersistence } from './ITipsPersistence';
export declare class TipsMemoryPersistence extends IdentifiableMemoryPersistence<TipV1, string> implements ITipsPersistence {
    constructor();
    private matchString;
    private matchMultiString;
    private matchSearch;
    private contains;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<TipV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: TipV1) => void): void;
}
