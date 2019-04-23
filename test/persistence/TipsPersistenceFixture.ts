let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { MultiString } from 'pip-services3-commons-node';

import { ITipsPersistence } from '../../src/persistence/ITipsPersistence';
import { TipV1 } from '../../src/data/version1/TipV1';
import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';

let TIP1 = <TipV1>{
    id: '1',
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 1' }),
    content: new MultiString({ en: 'Sample Tip #1' }),
    status: 'new'
};
let TIP2 = <TipV1>{
    id: '2',
    tags: ['TAG 1'],
    all_tags: ['tag1'],
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 2' }),
    content: new MultiString({ en: 'Sample Tip #2' }),
    status: 'new'
};
let TIP3 = <TipV1>{
    id: '3',
    tags: ['Tag 1', 'tag 2'],
    all_tags: ['tag1', 'tag2'],
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 3' }),
    content: new MultiString({ en: 'Sample Tip #3' }),
    status: 'translating'
};

export class TipsPersistenceFixture {
    private _persistence: ITipsPersistence;
    
    constructor(persistence: ITipsPersistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    public createTips(done) {
        async.series([
        // Create one tip
            (callback) => {
                this._persistence.create(
                    null,
                    TIP1,
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.equal(tip.status, 'new');
                        assert.sameMembers(tip.topics, TIP1.topics);
                        //assert.equal(tip.content, TIP1.content);

                        callback();
                    }
                );
            },
        // Create another tip
            (callback) => {
                this._persistence.create(
                    null,
                    TIP2,
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.equal(tip.status, 'new');
                        assert.sameMembers(tip.topics, TIP2.topics);
                        //assert.equal(tip.content, TIP2.content);

                        callback();
                    }
                );
            },
        // Create yet another tip
            (callback) => {
                this._persistence.create(
                    null,
                    TIP3,
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.equal(tip.status, TIP3.status);
                        assert.sameMembers(tip.topics, TIP3.topics);
                        //assert.equal(tip.content, TIP3.content);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let tip1: TipV1;

        async.series([
        // Create items
            (callback) => {
                this.createTips(callback);
            },
        // Get all tips
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        tip1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the tip
            (callback) => {
                tip1.content = new MultiString({ en: 'Updated Content 1' });

                this._persistence.update(
                    null,
                    tip1,
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        //assert.equal(tip.content.get('en'), 'Updated Content 1');

                        callback();
                    }
                );
            },
        // Delete tip
            (callback) => {
                this._persistence.deleteById(
                    null,
                    tip1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete tip
            (callback) => {
                this._persistence.getOneById(
                    null,
                    tip1.id,
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isNull(tip || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    public testGetWithFilter(done) {
        async.series([
        // Create tips
            (callback) => {
                this.createTips(callback);
            },
        // Get topics filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        topics: ['maintenance']
                    }),
                    new PagingParams(),
                    (err, tips) => {
                        assert.isNull(err);
                        
                        assert.isObject(tips);
                        assert.lengthOf(tips.data, 3);

                        callback();
                    }
                );
            },
        // Get tips filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1']
                    }),
                    new PagingParams(),
                    (err, tips) => {
                        assert.isNull(err);
                        
                        assert.isObject(tips);
                        assert.lengthOf(tips.data, 2);

                        callback();
                    }
                );
            },
        // Get tips filtered by status
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        status: TIP3.status
                    }),
                    new PagingParams(),
                    (err, tips) => {
                        assert.isNull(err);
                        
                        assert.isObject(tips);
                        assert.lengthOf(tips.data, 1);

                        callback();
                    }
                );
            },
        ], done);
    }

    public testGetRandom(done) {
        async.series([
        // Create tips
            (callback) => {
                this.createTips(callback);
            },
        // Get random tip filtered by tags
            (callback) => {
                this._persistence.getOneRandom(
                    null,
                    FilterParams.fromValue({
                        tags: ['tag1'],
                        status: 'new'
                    }),
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.equal(TIP2.id, tip.id);

                        callback();
                    }
                );
            }
        ], done);
    }
}
