"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const AttachmentsMemoryPersistence_1 = require("../persistence/AttachmentsMemoryPersistence");
const AttachmentsFilePersistence_1 = require("../persistence/AttachmentsFilePersistence");
const AttachmentsMongoDbPersistence_1 = require("../persistence/AttachmentsMongoDbPersistence");
const AttachmentsController_1 = require("../logic/AttachmentsController");
const AttachmentsSenecaServiceV1_1 = require("../services/version1/AttachmentsSenecaServiceV1");
class AttachmentsSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-attachments', seneca, AttachmentsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new AttachmentsController_1.AttachmentsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new AttachmentsMongoDbPersistence_1.AttachmentsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new AttachmentsFilePersistence_1.AttachmentsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new AttachmentsMemoryPersistence_1.AttachmentsMemoryPersistence();
        else
            throw new pip_services_commons_node_5.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        let service = new AttachmentsSenecaServiceV1_1.AttachmentsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-attachments', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-attachments', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-attachments', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.AttachmentsSenecaPlugin = AttachmentsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new AttachmentsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=AttachmentsSenecaPlugin.js.map