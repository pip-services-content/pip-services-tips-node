let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';

import { BlobAttachmentV1 } from '../../src/data/version1/BlobAttachmentV1';
import { ReferenceV1 } from '../../src/data/version1/ReferenceV1';
import { AttachmentsMemoryPersistence } from '../../src/persistence/AttachmentsMemoryPersistence';
import { AttachmentsController } from '../../src/logic/AttachmentsController';
import { AttachmentsLambdaFunction } from '../../src/container/AttachmentsLambdaFunction';


suite('AttachmentsLambdaFunction', ()=> {
    let lambda: AttachmentsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services-commons:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-attachments:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-attachments:controller:default:default:1.0'
        );

        lambda = new AttachmentsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        async.series([
        // Add attachments
            (callback) => {
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
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
                lambda.act(
                    {
                        role: 'attachments',
                        cmd: 'delete_attachment_by_id',
                        id: '1'
                    },
                    (err, item) => {
                        assert.isNull(err);

                        assert.isNull(item);

                        callback();
                    }
                );
            },
        // Try to get deleted attachments
            (callback) => {
                lambda.act(
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