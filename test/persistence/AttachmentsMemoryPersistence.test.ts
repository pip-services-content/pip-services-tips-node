import { AttachmentsMemoryPersistence } from '../../src/persistence/AttachmentsMemoryPersistence';
import { AttachmentsPersistenceFixture } from './AttachmentsPersistenceFixture';

suite('AttachmentsMemoryPersistence', ()=> {
    let persistence: AttachmentsMemoryPersistence;
    let fixture: AttachmentsPersistenceFixture;
    
    setup((done) => {
        persistence = new AttachmentsMemoryPersistence();
        fixture = new AttachmentsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});