"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const TipsMongoDbPersistence_1 = require("../persistence/TipsMongoDbPersistence");
const TipsFilePersistence_1 = require("../persistence/TipsFilePersistence");
const TipsMemoryPersistence_1 = require("../persistence/TipsMemoryPersistence");
const TipsController_1 = require("../logic/TipsController");
const TipsHttpServiceV1_1 = require("../services/version1/TipsHttpServiceV1");
const TipsSenecaServiceV1_1 = require("../services/version1/TipsSenecaServiceV1");
class TipsFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(TipsFactory.MemoryPersistenceDescriptor, TipsMemoryPersistence_1.TipsMemoryPersistence);
        this.registerAsType(TipsFactory.FilePersistenceDescriptor, TipsFilePersistence_1.TipsFilePersistence);
        this.registerAsType(TipsFactory.MongoDbPersistenceDescriptor, TipsMongoDbPersistence_1.TipsMongoDbPersistence);
        this.registerAsType(TipsFactory.ControllerDescriptor, TipsController_1.TipsController);
        this.registerAsType(TipsFactory.SenecaServiceDescriptor, TipsSenecaServiceV1_1.TipsSenecaServiceV1);
        this.registerAsType(TipsFactory.HttpServiceDescriptor, TipsHttpServiceV1_1.TipsHttpServiceV1);
    }
}
TipsFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-tips", "factory", "default", "default", "1.0");
TipsFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tips", "persistence", "memory", "*", "1.0");
TipsFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tips", "persistence", "file", "*", "1.0");
TipsFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tips", "persistence", "mongodb", "*", "1.0");
TipsFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tips", "controller", "default", "*", "1.0");
TipsFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tips", "service", "seneca", "*", "1.0");
TipsFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-tips", "service", "http", "*", "1.0");
exports.TipsFactory = TipsFactory;
//# sourceMappingURL=TipsFactory.js.map