import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { TipV1 } from '../data/version1/TipV1';
export interface ITipsController {
    getTips(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<TipV1>) => void): void;
    getRandomTip(correlationId: string, filter: FilterParams, callback: (err: any, tip: TipV1) => void): void;
    getTipById(correlationId: string, tipId: string, callback: (err: any, tip: TipV1) => void): void;
    createTip(correlationId: string, tip: TipV1, callback: (err: any, tip: TipV1) => void): void;
    updateTip(correlationId: string, tip: TipV1, callback: (err: any, tip: TipV1) => void): void;
    deleteTipById(correlationId: string, tipId: string, callback: (err: any, tip: TipV1) => void): void;
}
