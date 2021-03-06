import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { TipsMongoDbPersistence } from '../persistence/TipsMongoDbPersistence';
import { TipsFilePersistence } from '../persistence/TipsFilePersistence';
import { TipsMemoryPersistence } from '../persistence/TipsMemoryPersistence';
import { TipsController } from '../logic/TipsController';
import { TipsHttpServiceV1 } from '../services/version1/TipsHttpServiceV1';

export class TipsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-tips", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("pip-services-tips", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("pip-services-tips", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("pip-services-tips", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-tips", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-tips", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(TipsServiceFactory.MemoryPersistenceDescriptor, TipsMemoryPersistence);
		this.registerAsType(TipsServiceFactory.FilePersistenceDescriptor, TipsFilePersistence);
		this.registerAsType(TipsServiceFactory.MongoDbPersistenceDescriptor, TipsMongoDbPersistence);
		this.registerAsType(TipsServiceFactory.ControllerDescriptor, TipsController);
		this.registerAsType(TipsServiceFactory.HttpServiceDescriptor, TipsHttpServiceV1);
	}
	
}
