import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { TipsMemoryPersistence } from './TipsMemoryPersistence';
import { TipV1 } from '../data/version1/TipV1';
export declare class TipsFilePersistence extends TipsMemoryPersistence {
    protected _persister: JsonFilePersister<TipV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
