import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { AttachmentsMemoryPersistence } from './AttachmentsMemoryPersistence';
import { AttachmentV1 } from '../data/version1/AttachmentV1';

export class AttachmentsFilePersistence extends AttachmentsMemoryPersistence {
	protected _persister: JsonFilePersister<AttachmentV1>;

    public constructor(path?: string) {
        super();

        this._persister = new JsonFilePersister<AttachmentV1>(path);
        this._loader = this._persister;
        this._saver = this._persister;
    }

    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persister.configure(config);
    }

}