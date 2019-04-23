import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';
import { TipV1 } from '../data/version1/TipV1';
export interface ITipsPersistence extends IGetter<TipV1, string>, IWriter<TipV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<TipV1>) => void): void;
    getOneRandom(correlationId: string, filter: FilterParams, callback: (err: any, item: TipV1) => void): void;
    getOneById(correlationId: string, id: string, callback: (err: any, item: TipV1) => void): void;
    create(correlationId: string, item: TipV1, callback: (err: any, item: TipV1) => void): void;
    update(correlationId: string, item: TipV1, callback: (err: any, item: TipV1) => void): void;
    deleteById(correlationId: string, id: string, callback: (err: any, item: TipV1) => void): void;
}
