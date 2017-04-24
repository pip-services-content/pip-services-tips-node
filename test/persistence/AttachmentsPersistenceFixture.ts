let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';

import { IAttachmentsPersistence } from '../../src/persistence/IAttachmentsPersistence';
import { BlobAttachmentsV1 } from '../../src/data/version1/BlobAttachmentsV1';
import { ReferenceV1 } from '../../src/data/version1/ReferenceV1';

export class AttachmentsPersistenceFixture {
    private _persistence: IAttachmentsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    testCrudOperations(done) {
        async.series([
        // Add reference
            (callback) => {
                this._persistence.addReference(
                    null,
                    '1',
                    {
                        type: 'goal',
                        id: '000000000000000000000011',
                        name: 'Goal 1'
                    },
                    (err, item) => {
                        assert.isNull(err);

                        assert.isObject(item);
                        assert.lengthOf(item.references, 1);

                        callback();
                    }
                );
            },
        // Add another reference
            (callback) => {
                this._persistence.addReference(
                    null,
                    '1',
                    {
                        type: 'goal',
                        id: '000000000000000000000012',
                        name: 'Goal 2'
                    },
                    (err, item) => {
                        assert.isNull(err);

                        assert.isObject(item);
                        assert.lengthOf(item.references, 2);

                        callback();
                    }
                );
            },
        // Add reference again
            (callback) => {
                this._persistence.addReference(
                    null,
                    '1',
                    {
                        type: 'goal',
                        id: '000000000000000000000012',
                        name: 'Goal 2'
                    },
                    (err, item) => {
                        assert.isNull(err);

                        assert.isObject(item);
                        assert.lengthOf(item.references, 3);

                        callback();
                    }
                );
            },
        // Check attachments has references
            (callback) => {
                this._persistence.getOneById(
                    null,
                    '1',
                    (err, item) => {
                        assert.isNull(err);
                        
                        assert.isObject(item);
                        assert.lengthOf(item.references, 3);

                        callback();
                    }
                );
            },
        // Remove reference
            (callback) => {
                this._persistence.removeReference(
                    null,
                    '1',
                    {
                        type: 'goal',
                        id: '000000000000000000000011',
                        name: null
                    },
                    (err, item) => {
                        assert.isNull(err);

                        assert.isObject(item);
                        assert.lengthOf(item.references, 2);

                        callback();
                    }
                );
            },
        // Remove another reference
            (callback) => {
                this._persistence.removeReference(
                    null,
                    '1',
                    {
                        type: 'goal',
                        id: '000000000000000000000012',
                        name: null
                    },
                    (err, item) => {
                        assert.isNull(err);

                        assert.isObject(item);
                        assert.lengthOf(item.references, 1);

                        callback();
                    }
                );
            },
        // Remove attachments
            (callback) => {
                this._persistence.deleteById(
                    null,
                    '1',
                    (err, item) => {
                        assert.isNull(err);

                        assert.isObject(item);
                        assert.lengthOf(item.references, 1);

                        callback();
                    }
                );
            },
        // Try to get deleted attachments
            (callback) => {
                this._persistence.getOneById(
                    null,
                    '1',
                    (err, item) => {
                        assert.isNull(err);
                        
                        assert.isNull(item || null);

                        callback();
                    }
                );
            },
        ], done);
    }

}
