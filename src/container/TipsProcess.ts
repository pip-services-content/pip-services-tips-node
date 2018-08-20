import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { TipsServiceFactory } from '../build/TipsServiceFactory';
import { DefaultRpcFactory } from 'pip-services-rpc-node';

export class TipsProcess extends ProcessContainer {

    public constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
