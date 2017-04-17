import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { TipV1 } from '../data/version1/TipV1';
import { ITipsBusinessLogic } from './ITipsBusinessLogic';
export declare class TipsController implements IConfigurable, IReferenceable, ICommandable, ITipsBusinessLogic {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _attachmentsClient;
    private _attachmentsConnector;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getTips(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<TipV1>) => void): void;
    getRandomTip(correlationId: string, filter: FilterParams, callback: (err: any, tip: TipV1) => void): void;
    getTipById(correlationId: string, tipId: string, callback: (err: any, item: TipV1) => void): void;
    createTip(correlationId: string, tip: TipV1, callback: (err: any, tip: TipV1) => void): void;
    updateTip(correlationId: string, tip: TipV1, callback: (err: any, tip: TipV1) => void): void;
    deleteTipById(correlationId: string, tipId: string, callback: (err: any, tip: TipV1) => void): void;
}
