import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { TipsMongoDbPersistence } from '../persistence/TipsMongoDbPersistence';
import { TipsFilePersistence } from '../persistence/TipsFilePersistence';
import { TipsMemoryPersistence } from '../persistence/TipsMemoryPersistence';
import { TipsController } from '../logic/TipsController';
import { TipsHttpServiceV1 } from '../services/version1/TipsHttpServiceV1';
import { TipsSenecaServiceV1 } from '../services/version1/TipsSenecaServiceV1'; 

export class TipsFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-tips", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-tips", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-tips", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-tips", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-tips", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-tips", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-tips", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(TipsFactory.MemoryPersistenceDescriptor, TipsMemoryPersistence);
		this.registerAsType(TipsFactory.FilePersistenceDescriptor, TipsFilePersistence);
		this.registerAsType(TipsFactory.MongoDbPersistenceDescriptor, TipsMongoDbPersistence);
		this.registerAsType(TipsFactory.ControllerDescriptor, TipsController);
		this.registerAsType(TipsFactory.SenecaServiceDescriptor, TipsSenecaServiceV1);
		this.registerAsType(TipsFactory.HttpServiceDescriptor, TipsHttpServiceV1);
	}
	
}
