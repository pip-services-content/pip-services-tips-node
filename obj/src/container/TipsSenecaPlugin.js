"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_seneca_node_1 = require("pip-services-seneca-node");
const pip_services_seneca_node_2 = require("pip-services-seneca-node");
const TipsMemoryPersistence_1 = require("../persistence/TipsMemoryPersistence");
const TipsFilePersistence_1 = require("../persistence/TipsFilePersistence");
const TipsMongoDbPersistence_1 = require("../persistence/TipsMongoDbPersistence");
const TipsController_1 = require("../logic/TipsController");
const TipsSenecaServiceV1_1 = require("../services/version1/TipsSenecaServiceV1");
class TipsSenecaPlugin extends pip_services_seneca_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-tips', seneca, TipsSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_components_node_1.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let controller = new TipsController_1.TipsController();
        let persistence;
        let persistenceOptions = options.persistence || {};
        let persistenceType = persistenceOptions.type || 'memory';
        if (persistenceType == 'mongodb')
            persistence = new TipsMongoDbPersistence_1.TipsMongoDbPersistence();
        else if (persistenceType == 'file')
            persistence = new TipsFilePersistence_1.TipsFilePersistence();
        else if (persistenceType == 'memory')
            persistence = new TipsMemoryPersistence_1.TipsMemoryPersistence();
        else
            throw new pip_services_commons_node_4.ConfigException(null, 'WRONG_PERSISTENCE_TYPE', 'Unrecognized persistence type: ' + persistenceType);
        persistence.configure(pip_services_commons_node_3.ConfigParams.fromValue(persistenceOptions));
        let senecaInstance = new pip_services_seneca_node_2.SenecaInstance(seneca);
        let service = new TipsSenecaServiceV1_1.TipsSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-seneca', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-tips', 'persistence', persistenceType, 'default', '1.0'), persistence, new pip_services_commons_node_2.Descriptor('pip-services-tips', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-tips', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.TipsSenecaPlugin = TipsSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new TipsSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=TipsSenecaPlugin.js.map