// Minimal concat-stream replacement for the test suite: collect a piped stream
// into one Buffer, then call back with it (the Buffer-returning form the tests
// use). Avoids depending on the abandoned concat-stream package.
var Writable = require('stream').Writable;

module.exports = function concat(cb) {
    var chunks = [];
    return new Writable({
        write: function (chunk, enc, next) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            next();
        },
        final: function (next) { cb(Buffer.concat(chunks)); next(); }
    });
};
