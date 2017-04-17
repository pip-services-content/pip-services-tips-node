import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';

import { PartyReferenceV1 } from '../data/version1/PartyReferenceV1';
import { TipV1 } from '../data/version1/TipV1';

export interface ITipsBusinessLogic {
    getTips(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<TipV1>) => void): void;

    getRandomTip(correlationId: string, filter: FilterParams,
        callback: (err: any, tip: TipV1) => void): void;

    getTipById(correlationId: string, tipId: string,
        callback: (err: any, tip: TipV1) => void): void;

    createTip(correlationId: string, tip: TipV1,
        callback: (err: any, tip: TipV1) => void): void;

    updateTip(correlationId: string, tip: TipV1,
        callback: (err: any, tip: TipV1) => void): void;

    deleteTipById(correlationId: string, tipId: string,
        callback: (err: any, tip: TipV1) => void): void;
}
