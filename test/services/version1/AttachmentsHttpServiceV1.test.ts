let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { BlobAttachmentV1 } from '../../../src/data/version1/BlobAttachmentV1';
import { ReferenceV1 } from '../../../src/data/version1/ReferenceV1';
import { AttachmentsMemoryPersistence } from '../../../src/persistence/AttachmentsMemoryPersistence';
import { AttachmentsController } from '../../../src/logic/AttachmentsController';
import { AttachmentsHttpServiceV1 } from '../../../src/services/version1/AttachmentsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('AttachmentsHttpServiceV1', ()=> {
    let service: AttachmentsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new AttachmentsMemoryPersistence();
        let controller = new AttachmentsController();

        service = new AttachmentsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-attachments', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-attachments', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-attachments', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
     test('CRUD Operations', (done) => {
        async.series([
        // Add attachments
            (callback) => {
                rest.post('/v1/attachments/add_attachments',
                    {
                        reference: {
                            type: 'goal',
                            id: '000000000000000000000011',
                            name: 'Goal 1'
                        },
                        ids: ['1', '2']
                    },
                    (err, req, res) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Add other attachments
            (callback) => {
                rest.post('/v1/attachments/add_attachments',
                    {
                        reference: {
                            type: 'goal',
                            id: '000000000000000000000012',
                            name: 'Goal 2'
                        },
                        ids: ['2', '3']
                    },
                    (err, req, res) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Check attachments has references
            (callback) => {
                rest.post('/v1/attachments/get_attachment_by_id',
                    {
                        id: '2'
                    },
                    (err, req, res, item) => {
                        assert.isNull(err);
                        
                        assert.isObject(item);
                        assert.lengthOf(item.references, 2);

                        callback();
                    }
                );
            },
        // Remove reference
            (callback) => {
                rest.post('/v1/attachments/update_attachments',
                    {
                        reference: {
                            type: 'goal',
                            id: '000000000000000000000011',
                            name: null
                        },
                        old_ids: ['1', '2'],
                        new_ids: ['1']
                    },
                    (err, req, res) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Remove another reference
            (callback) => {
                rest.post('/v1/attachments/remove_attachments',
                    {
                        reference: {
                            type: 'goal',
                            id: '000000000000000000000011',
                            name: null
                        },
                        ids: ['1']
                    },
                    (err, req, res) => {
                        assert.isNull(err);
                        callback();
                    }
                );
            },
        // Remove attachments
            (callback) => {
                rest.post('/v1/attachments/delete_attachment_by_id',
                    {
                        id: '1'
                    },
                    (err, req, res, item) => {
                        assert.isNull(err);

                        //assert.isNull(item);

                        callback();
                    }
                );
            },
        // Try to get deleted attachments
            (callback) => {
                rest.post('/v1/attachments/get_attachment_by_id',
                    {
                        id: '2'
                    },
                    (err, req, res, item) => {
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