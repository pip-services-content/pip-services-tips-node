let AttachmentsProcess = require('../obj/src/container/AttachmentsProcess').AttachmentsProcess;

try {
    new AttachmentsProcess().runWithArguments(process.argv);
} catch (ex) {
    console.error(ex);
}
