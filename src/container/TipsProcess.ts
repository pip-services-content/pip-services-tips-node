import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';
import { DefaultNetFactory } from 'pip-services-net-node';
import { DefaultOssFactory } from 'pip-services-oss-node';

import { TipsServiceFactory } from '../build/TipsServiceFactory';

export class TipsProcess extends ProcessContainer {

    public constructor() {
        super("tips", "User tips microservice");
        this._factories.add(new TipsServiceFactory);
        this._factories.add(new DefaultNetFactory);
        this._factories.add(new DefaultOssFactory);
    }

}
