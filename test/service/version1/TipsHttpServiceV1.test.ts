let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { TipV1 } from '../../../src/data/version1/TipV1';
import { TipsMemoryPersistence } from '../../../src/persistence/TipsMemoryPersistence';
import { TipsController } from '../../../src/logic/TipsController';
import { TipsHttpServiceV1 } from '../../../src/services/version1/TipsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let TIP1 = <TipV1>{
    id: '1',
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: <MultiString>{ en: 'Tip 1' },
    content: <MultiString>{ en: 'Sample Tip #1' }
};
let TIP2 = <TipV1>{
    id: '2',
    tags: ['TAG 1'],
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: <MultiString>{ en: 'Tip 2' },
    content: <MultiString>{ en: 'Sample Tip #2' }
};

suite('TipsHttpServiceV1', ()=> {
    let service: TipsHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let persistence = new TipsMemoryPersistence();
        let controller = new TipsController();

        service = new TipsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-tips', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-tips', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-tips', 'service', 'http', 'default', '1.0'), service
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
        let tip1, tip2;

        async.series([
        // Create one tip
            (callback) => {
                rest.post('/v1/tips/create_tip',
                    {
                        tip: TIP1
                    },
                    (err, req, res, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.sameMembers(tip.topics, TIP1.topics);
                        assert.equal(tip.content.en, TIP1.content.en);

                        tip1 = tip;

                        callback();
                    }
                );
            },
        // Create another tip
            (callback) => {
                rest.post('/v1/tips/create_tip',
                    {
                        tip: TIP2
                    },
                    (err, req, res, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.sameMembers(tip.topics, TIP2.topics);
                        assert.equal(tip.content.en, TIP2.content.en);

                        tip2 = tip;

                        callback();
                    }
                );
            },
        // Get all tips
            (callback) => {
                rest.post('/v1/tips/get_tips',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the tip
            (callback) => {
                tip1.content = <MultiString>{ en: 'Updated Content 1' };

                rest.post('/v1/tips/update_tip',
                    {
                        tip: tip1
                    },
                    (err, req, res, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.equal(tip.content.en, 'Updated Content 1');
                        assert.sameMembers(tip.topics, TIP1.topics);

                        tip1 = tip;

                        callback();
                    }
                );
            },
        // Delete tip
            (callback) => {
                rest.post('/v1/tips/delete_tip_by_id',
                    {
                        tip_id: tip1.id
                    },
                    (err, req, res) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete tip
            (callback) => {
                rest.post('/v1/tips/get_tip_by_id',
                    {
                        tip_id: tip1.id
                    },
                    (err, req, res, tip) => {
                        assert.isNull(err);
                        
                        //assert.isNull(tip || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});