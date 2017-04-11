"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const AttachmentsMongoDbPersistence_1 = require("../persistence/AttachmentsMongoDbPersistence");
const AttachmentsFilePersistence_1 = require("../persistence/AttachmentsFilePersistence");
const AttachmentsMemoryPersistence_1 = require("../persistence/AttachmentsMemoryPersistence");
const AttachmentsController_1 = require("../logic/AttachmentsController");
const AttachmentsHttpServiceV1_1 = require("../services/version1/AttachmentsHttpServiceV1");
const AttachmentsSenecaServiceV1_1 = require("../services/version1/AttachmentsSenecaServiceV1");
class AttachmentsFactory extends pip_services_commons_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(AttachmentsFactory.MemoryPersistenceDescriptor, AttachmentsMemoryPersistence_1.AttachmentsMemoryPersistence);
        this.registerAsType(AttachmentsFactory.FilePersistenceDescriptor, AttachmentsFilePersistence_1.AttachmentsFilePersistence);
        this.registerAsType(AttachmentsFactory.MongoDbPersistenceDescriptor, AttachmentsMongoDbPersistence_1.AttachmentsMongoDbPersistence);
        this.registerAsType(AttachmentsFactory.ControllerDescriptor, AttachmentsController_1.AttachmentsController);
        this.registerAsType(AttachmentsFactory.SenecaServiceDescriptor, AttachmentsSenecaServiceV1_1.AttachmentsSenecaServiceV1);
        this.registerAsType(AttachmentsFactory.HttpServiceDescriptor, AttachmentsHttpServiceV1_1.AttachmentsHttpServiceV1);
    }
}
AttachmentsFactory.Descriptor = new pip_services_commons_node_2.Descriptor("pip-services-attachments", "factory", "default", "default", "1.0");
AttachmentsFactory.MemoryPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-attachments", "persistence", "memory", "*", "1.0");
AttachmentsFactory.FilePersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-attachments", "persistence", "file", "*", "1.0");
AttachmentsFactory.MongoDbPersistenceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-attachments", "persistence", "mongodb", "*", "1.0");
AttachmentsFactory.ControllerDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-attachments", "controller", "default", "*", "1.0");
AttachmentsFactory.SenecaServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-attachments", "service", "seneca", "*", "1.0");
AttachmentsFactory.HttpServiceDescriptor = new pip_services_commons_node_2.Descriptor("pip-services-attachments", "service", "http", "*", "1.0");
exports.AttachmentsFactory = AttachmentsFactory;
//# sourceMappingURL=AttachmentsFactory.js.map