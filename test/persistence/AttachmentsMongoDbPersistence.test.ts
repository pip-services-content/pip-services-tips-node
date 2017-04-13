import { YamlConfigReader } from 'pip-services-commons-node';

import { AttachmentsMongoDbPersistence } from '../../src/persistence/AttachmentsMongoDbPersistence';
import { AttachmentsPersistenceFixture } from './AttachmentsPersistenceFixture';

suite('AttachmentsMongoDbPersistence', ()=> {
    let persistence: AttachmentsMongoDbPersistence;
    let fixture: AttachmentsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new AttachmentsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new AttachmentsPersistenceFixture(persistence);

        persistence.open(null, (err: any) => {
            persistence.clear(null, (err) => {
                done(err);
            });
        });
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });
});