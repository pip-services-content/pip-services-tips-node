import { YamlConfigReader } from 'pip-services-commons-node';

import { TipsMongoDbPersistence } from '../../src/persistence/TipsMongoDbPersistence';
import { TipsPersistenceFixture } from './TipsPersistenceFixture';

suite('TipsMongoDbPersistence', ()=> {
    let persistence: TipsMongoDbPersistence;
    let fixture: TipsPersistenceFixture;

    setup((done) => {
        let config = YamlConfigReader.readConfig(null, './config/test_connections.yaml', null);
        let dbConfig = config.getSection('mongodb');

        persistence = new TipsMongoDbPersistence();
        persistence.configure(dbConfig);

        fixture = new TipsPersistenceFixture(persistence);

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

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

    test('Get Random', (done) => {
        fixture.testGetRandom(done);
    });
    
});