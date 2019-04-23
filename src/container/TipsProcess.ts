import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';

import { TipsServiceFactory } from '../build/TipsServiceFactory';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

export class TipsProcess extends ProcessContainer {

    public constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
