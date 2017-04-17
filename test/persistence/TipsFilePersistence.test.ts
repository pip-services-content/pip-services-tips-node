import { ConfigParams } from 'pip-services-commons-node';

import { TipsFilePersistence } from '../../src/persistence/TipsFilePersistence';
import { TipsPersistenceFixture } from './TipsPersistenceFixture';

suite('TipsFilePersistence', ()=> {
    let persistence: TipsFilePersistence;
    let fixture: TipsPersistenceFixture;
    
    setup((done) => {
        persistence = new TipsFilePersistence('./data/Tips.test.json');

        fixture = new TipsPersistenceFixture(persistence);
        
        persistence.open(null, (err) => {
            if (err) done(err);
            else persistence.clear(null, done);
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