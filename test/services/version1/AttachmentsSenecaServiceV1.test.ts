let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { AttachmentV1 } from '../../../src/data/version1/AttachmentV1';
import { ReferenceV1 } from '../../../src/data/version1/ReferenceV1';
import { AttachmentsMemoryPersistence } from '../../../src/persistence/AttachmentsMemoryPersistence';
import { AttachmentsController } from '../../../src/logic/AttachmentsController';
import { AttachmentsSenecaServiceV1 } from '../../../src/services/version1/AttachmentsSenecaServiceV1';

suite('AttachmentsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: AttachmentsSenecaServiceV1;
    let persistence: AttachmentsMemoryPersistence;
    let controller: AttachmentsController;

    suiteSetup((done) => {
        persistence = new AttachmentsMemoryPersistence();
        controller = new AttachmentsController();

        service = new AttachmentsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-attachments', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-attachments', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-attachments', 'service', 'seneca', 'default', '1.0'), service
        );

        controller.setReferences(references);
        service.setReferences(references);

        seneca = senecaAddon.getInstance();

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });
    
    setup((done) => {
        persistence.clear(null, done);
    });
    
    test('CRUD Operations', (done) => {
        async.series([
        // Add attachments
            (callback) => {
                seneca.act(
                    {
                        role: 'attachments',
                        cmd: 'add_attachments',
                        reference: {
                            type: 'goal',
                            id: '000000000000000000000011',
                            name: 'Goal 1'
                        },
                        ids: ['1', '2']
                    },
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Add other attachments
            (callback) => {
                seneca.act(
                    {
                        role: 'attachments',
                        cmd: 'add_attachments',
                        reference: {
                            type: 'goal',
                            id: '000000000000000000000012',
                            name: 'Goal 2'
                        },
                        ids: ['2', '3']
                    },
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Check attachments has references
            (callback) => {
                seneca.act(
                    {
                        role: 'attachments',
                        cmd: 'get_attachment_by_id',
                        id: '2'
                    },
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
                seneca.act(
                    {
                        role: 'attachments',
                        cmd: 'update_attachments',
                        reference: {
                            type: 'goal',
                            id: '000000000000000000000011',
                            name: null
                        },
                        old_ids: ['1', '2'],
                        new_ids: ['1']
                    },
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Remove another reference
            (callback) => {
                seneca.act(
                    {
                        role: 'attachments',
                        cmd: 'remove_attachments',
                        reference: {
                            type: 'goal',
                            id: '000000000000000000000011',
                            name: null
                        },
                        ids: ['1']
                    },
                    (err) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Remove attachments
            (callback) => {
                seneca.act(
                    {
                        role: 'attachments',
                        cmd: 'delete_attachment_by_id',
                        id: '1'
                    },
                    (err, item) => {
                        assert.isNull(err);

                        assert.isObject(item);
                        assert.lengthOf(item.references, 0);

                        callback();
                    }
                );
            },
        // Try to get deleted attachments
            (callback) => {
                seneca.act(
                    {
                        role: 'attachments',
                        cmd: 'get_attachment_by_id',
                        id: '2'
                    },
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