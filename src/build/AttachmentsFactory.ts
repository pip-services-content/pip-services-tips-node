import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { AttachmentsMongoDbPersistence } from '../persistence/AttachmentsMongoDbPersistence';
import { AttachmentsFilePersistence } from '../persistence/AttachmentsFilePersistence';
import { AttachmentsMemoryPersistence } from '../persistence/AttachmentsMemoryPersistence';
import { AttachmentsController } from '../logic/AttachmentsController';
import { AttachmentsHttpServiceV1 } from '../services/version1/AttachmentsHttpServiceV1';
import { AttachmentsSenecaServiceV1 } from '../services/version1/AttachmentsSenecaServiceV1'; 

export class AttachmentsFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-attachments", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-attachments", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-attachments", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-attachments", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-attachments", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-attachments", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-attachments", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(AttachmentsFactory.MemoryPersistenceDescriptor, AttachmentsMemoryPersistence);
		this.registerAsType(AttachmentsFactory.FilePersistenceDescriptor, AttachmentsFilePersistence);
		this.registerAsType(AttachmentsFactory.MongoDbPersistenceDescriptor, AttachmentsMongoDbPersistence);
		this.registerAsType(AttachmentsFactory.ControllerDescriptor, AttachmentsController);
		this.registerAsType(AttachmentsFactory.SenecaServiceDescriptor, AttachmentsSenecaServiceV1);
		this.registerAsType(AttachmentsFactory.HttpServiceDescriptor, AttachmentsHttpServiceV1);
	}
	
}
