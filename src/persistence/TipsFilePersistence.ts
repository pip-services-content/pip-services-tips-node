import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { TipsMemoryPersistence } from './TipsMemoryPersistence';
import { TipV1 } from '../data/version1/TipV1';

export class TipsFilePersistence extends TipsMemoryPersistence {
	protected _persister: JsonFilePersister<TipV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<TipV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}