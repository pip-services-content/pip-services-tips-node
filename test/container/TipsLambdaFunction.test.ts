let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';
import { MultiString } from 'pip-services3-commons-node';

import { PartyReferenceV1 } from '../../src/data/version1/PartyReferenceV1';
import { TipV1 } from '../../src/data/version1/TipV1';
import { TipsMemoryPersistence } from '../../src/persistence/TipsMemoryPersistence';
import { TipsController } from '../../src/logic/TipsController';
import { TipsLambdaFunction } from '../../src/container/TipsLambdaFunction';

let TIP1 = <TipV1>{
    id: '1',
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 1' }),
    content: new MultiString({ en: 'Sample Tip #1' })
};
let TIP2 = <TipV1>{
    id: '2',
    tags: ['TAG 1'],
    topics: ['maintenance'],
    creator: <PartyReferenceV1>{
        id: '1',
        name: 'Test User'
    },
    title: new MultiString({ en: 'Tip 2' }),
    content: new MultiString({ en: 'Sample Tip #2' })
};

suite('TipsLambdaFunction', ()=> {
    let lambda: TipsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'pip-services-tips:persistence:memory:default:1.0',
            'controller.descriptor', 'pip-services-tips:controller:default:default:1.0'
        );

        lambda = new TipsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        let tip1, tip2;

        async.series([
        // Create one tip
            (callback) => {
                lambda.act(
                    {
                        role: 'tips',
                        cmd: 'create_tip',
                        tip: TIP1
                    },
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.sameMembers(tip.topics, TIP1.topics);
                        assert.equal(tip.content.en, TIP1.content.get('en'));

                        tip1 = tip;

                        callback();
                    }
                );
            },
        // Create another tip
            (callback) => {
                lambda.act(
                    {
                        role: 'tips',
                        cmd: 'create_tip',
                        tip: TIP2
                    },
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isObject(tip);
                        assert.sameMembers(tip.topics, TIP2.topics);
                        assert.equal(tip.content.en, TIP2.content.get('en'));

                        tip2 = tip;

                        callback();
                    }
                );
            },
        // Get all tips
            (callback) => {
                lambda.act(
                    {
                        role: 'tips',
                        cmd: 'get_tips' 
                    },
                    (err, page) => {
                        assert.isNull(err);
                        
                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the tip
            (callback) => {
                tip1.content = new MultiString({ en: 'Updated Content 1' });

                lambda.act(
                    {
                        role: 'tips',
                        cmd: 'update_tip',
                        tip: tip1
                    },
                    (err, tip) => {
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
                lambda.act(
                    {
                        role: 'tips',
                        cmd: 'delete_tip_by_id',
                        tip_id: tip1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete tip
            (callback) => {
                lambda.act(
                    {
                        role: 'tips',
                        cmd: 'get_tip_by_id',
                        tip_id: tip1.id
                    },
                    (err, tip) => {
                        assert.isNull(err);
                        
                        assert.isNull(tip || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});