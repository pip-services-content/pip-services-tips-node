let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-commons-node';
import { MultiString } from 'pip-services-commons-node';
import { SenecaInstance } from 'pip-services-net-node';

import { PartyReferenceV1 } from '../../../src/data/version1/PartyReferenceV1';
import { TipV1 } from '../../../src/data/version1/TipV1';
import { TipsMemoryPersistence } from '../../../src/persistence/TipsMemoryPersistence';
import { TipsController } from '../../../src/logic/TipsController';
import { TipsSenecaServiceV1 } from '../../../src/services/version1/TipsSenecaServiceV1';

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

suite('TipsSenecaServiceV1', ()=> {
    let seneca: any;
    let service: TipsSenecaServiceV1;
    let persistence: TipsMemoryPersistence;
    let controller: TipsController;

    suiteSetup((done) => {
        persistence = new TipsMemoryPersistence();
        controller = new TipsController();

        service = new TipsSenecaServiceV1();
        service.configure(ConfigParams.fromTuples(
            "connection.protocol", "none"
        ));

        let logger = new ConsoleLogger();
        let senecaAddon = new SenecaInstance();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaAddon,
            new Descriptor('pip-services-tips', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-tips', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-tips', 'service', 'seneca', 'default', '1.0'), service
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
        let tip1, tip2;

        async.series([
        // Create one tip
            (callback) => {
                seneca.act(
                    {
                        role: 'tips',
                        cmd: 'create_tip',
                        tip: TIP1
                    },
                    (err, tip) => {
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
                seneca.act(
                    {
                        role: 'tips',
                        cmd: 'create_tip',
                        tip: TIP2
                    },
                    (err, tip) => {
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
                seneca.act(
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
                tip1.content = <MultiString>{ en: 'Updated Content 1' };

                seneca.act(
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
                seneca.act(
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
                seneca.act(
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