let _ = require('lodash');
let assert = require('chai').assert;

let pluginOptions = {
    logger: {
        level: 'debug'
    },
    persistence: {
        type: 'memory'
    },
    service: {
        connection: {
            protocol: 'none'
        }
    }
};

suite('AttachmentsSenecaPlugin', ()=> {
    let seneca;

    suiteSetup((done) => {
        seneca = require('seneca')({ strict: { result: false } });

        // Load Seneca plugin
        let plugin = require('../../src/container/AttachmentsSenecaPlugin');
        seneca.use(plugin, pluginOptions);

        seneca.ready(done);
    });

    suiteTeardown((done) => {
        seneca.close(done);
    });

    test('Ping', (done) => {
        seneca.act(
            {
                role: 'attachments',
                cmd: 'get_attachment_by_id',
                id: '1'
            },
            (err, attachment) => {
                assert.isNull(err);
                done();
            }
        );
    });
});