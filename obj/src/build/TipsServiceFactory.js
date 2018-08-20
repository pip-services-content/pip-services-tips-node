"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const TipsMongoDbPersistence_1 = require("../persistence/TipsMongoDbPersistence");
const TipsFilePersistence_1 = require("../persistence/TipsFilePersistence");
const TipsMemoryPersistence_1 = require("../persistence/TipsMemoryPersistence");
const TipsController_1 = require("../logic/TipsController");
const TipsHttpServiceV1_1 = require("../services/version1/TipsHttpServiceV1");
const TipsSenecaServiceV1_1 = require("../services/version1/TipsSenecaServiceV1");
class TipsServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(TipsServiceFactory.MemoryPersistenceDescriptor, TipsMemoryPersistence_1.TipsMemoryPersistence);
        this.registerAsType(TipsServiceFactory.FilePersistenceDescriptor, TipsFilePersistence_1.TipsFilePersistence);
        this.registerAsType(TipsServiceFactory.MongoDbPersistenceDescriptor, TipsMongoDbPersistence_1.TipsMongoDbPersistence);
        this.registerAsType(TipsServiceFactory.ControllerDescriptor, TipsController_1.TipsController);
        this.registerAsType(TipsServiceFactory.SenecaServiceDescriptor, TipsSenecaServiceV1_1.TipsSenecaServiceV1);
        this.registerAsType(TipsServiceFactory.HttpServiceDescriptor, TipsHttpServiceV1_1.TipsHttpServiceV1);
    }
}
TipsServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-tips", "factory", "default", "default", "1.0");
TipsServiceFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tips", "persistence", "memory", "*", "1.0");
TipsServiceFactory.FilePersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tips", "persistence", "file", "*", "1.0");
TipsServiceFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tips", "persistence", "mongodb", "*", "1.0");
TipsServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tips", "controller", "default", "*", "1.0");
TipsServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tips", "service", "seneca", "*", "1.0");
TipsServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-tips", "service", "http", "*", "1.0");
exports.TipsServiceFactory = TipsServiceFactory;
//# sourceMappingURL=TipsServiceFactory.js.map