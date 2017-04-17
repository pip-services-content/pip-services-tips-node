import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { TipsFactory } from '../build/TipsFactory';

export class TipsProcess extends ProcessContainer {

    public constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsFactory);
    }

}
