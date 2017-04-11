import { ConfigParams } from 'pip-services-commons-node';

import { AttachmentsFilePersistence } from '../../src/persistence/AttachmentsFilePersistence';
import { AttachmentsPersistenceFixture } from './AttachmentsPersistenceFixture';

suite('AttachmentsFilePersistence', ()=> {
    let persistence: AttachmentsFilePersistence;
    let fixture: AttachmentsPersistenceFixture;
    
    setup((done) => {
        persistence = new AttachmentsFilePersistence('./data/attachments.test.json');

        fixture = new AttachmentsPersistenceFixture(persistence);
        
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
});