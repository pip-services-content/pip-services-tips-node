let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { BlobAttachmentV1 } from '../../src/data/version1/BlobAttachmentV1';
import { ReferenceV1 } from '../../src/data/version1/ReferenceV1';
import { AttachmentsMemoryPersistence } from '../../src/persistence/AttachmentsMemoryPersistence';
import { AttachmentsController } from '../../src/logic/AttachmentsController';


suite('AttachmentsController', ()=> {
    let persistence: AttachmentsMemoryPersistence;
    let controller: AttachmentsController;

    suiteSetup(() => {
        persistence = new AttachmentsMemoryPersistence();
        controller = new AttachmentsController();

        let logger = new ConsoleLogger();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-attachments', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-attachments', 'controller', 'default', 'default', '1.0'), controller
        );

        controller.setReferences(references);
    });
        
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        async.series([
        // Add attachments
            (callback) => {
                controller.addAttachments(
                    null,
                    {
                        type: 'goal',
                        id: '000000000000000000000011',
                        name: 'Goal 1'
                    },
                    ['1', '2'],
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Add other attachments
            (callback) => {
                controller.addAttachments(
                    null,
                    {
                        type: 'goal',
                        id: '000000000000000000000012',
                        name: 'Goal 2'
                    },
                    ['2', '3'],
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Check attachments has references
            (callback) => {
                controller.getAttachmentById(
                    null,
                    '2',
                    (err, item) => {
                        assert.isNull(err);
                        
                        assert.isObject(item);
                        assert.lengthOf(item.references, 2);

                        callback();
                    }
                );
            },
        // Remove reference
            (callback) => {
                controller.updateAttachments(
                    null,
                    {
                        type: 'goal',
                        id: '000000000000000000000011',
                        name: null
                    },
                    ['1', '2'],
                    ['1'],
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Remove another reference
            (callback) => {
                controller.removeAttachments(
                    null,
                    {
                        type: 'goal',
                        id: '000000000000000000000011',
                        name: null
                    },
                    ['1'],
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Remove attachments
            (callback) => {
                controller.deleteAttachmentById(
                    null,
                    '1',
                    (err, item) => {
                        assert.isNull(err);

                        assert.isNull(item);

                        callback();
                    }
                );
            },
        // Try to get deleted attachments
            (callback) => {
                controller.getAttachmentById(
                    null,
                    '2',
                    (err, item) => {
                        assert.isNull(err);
                        
                        assert.isObject(item);
                        assert.lengthOf(item.references, 1);

                        let reference = item.references[0];
                        assert.equal('000000000000000000000012', reference.id);

                        callback();
                    }
                );
            },
        ], done);
    });
});