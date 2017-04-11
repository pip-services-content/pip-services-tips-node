import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-net-node';
import { SenecaInstance } from 'pip-services-net-node';

import { AttachmentsMemoryPersistence } from '../persistence/AttachmentsMemoryPersistence';
import { AttachmentsFilePersistence } from '../persistence/AttachmentsFilePersistence';
import { AttachmentsMongoDbPersistence } from '../persistence/AttachmentsMongoDbPersistence';
import { AttachmentsController } from '../logic/AttachmentsController';
import { AttachmentsSenecaServiceV1 } from '../services/version1/AttachmentsSenecaServiceV1';

export class AttachmentsSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-attachments', seneca, AttachmentsSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let controller = new AttachmentsController();

        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb') 
            persistence = new AttachmentsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new AttachmentsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new AttachmentsMemoryPersistence();
        else 
            throw new ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(ConfigParams.fromValue(persistenceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        let service = new AttachmentsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-attachments', 'persistence', persistenceType, 'default', '1.0'), persistence,
            new Descriptor('pip-services-attachments', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-attachments', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new AttachmentsSenecaPlugin(seneca, options);
    return { name: plugin.name };
}