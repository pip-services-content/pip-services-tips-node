import { TipsMemoryPersistence } from '../../src/persistence/TipsMemoryPersistence';
import { TipsPersistenceFixture } from './TipsPersistenceFixture';

suite('TipsMemoryPersistence', ()=> {
    let persistence: TipsMemoryPersistence;
    let fixture: TipsPersistenceFixture;
    
    setup((done) => {
        persistence = new TipsMemoryPersistence();
        fixture = new TipsPersistenceFixture(persistence);
        
        persistence.open(null, done);
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