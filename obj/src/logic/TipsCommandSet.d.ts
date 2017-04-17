import { CommandSet } from 'pip-services-commons-node';
import { ITipsBusinessLogic } from './ITipsBusinessLogic';
export declare class TipsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ITipsBusinessLogic);
    private makeGetTipsCommand();
    private makeGetRandomTipCommand();
    private makeGetTipByIdCommand();
    private makeCreateTipCommand();
    private makeUpdateTipCommand();
    private makeDeleteTipByIdCommand();
}
