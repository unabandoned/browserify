// Vendored read-only-stream: expose a source stream as a plain read-only
// Readable so callers of b.bundle() can consume browserify's pipeline output
// without being able to write into or otherwise mutate it.
//
// This runs in Node at bundle time, so it uses node:stream directly instead of
// the abandoned read-only-stream package (and its readable-stream@2 subtree).
// The logic is otherwise a faithful copy of the original.
var Readable = require('stream').Readable;

module.exports = function (stream) {
    var opts = stream._readableState;
    if (typeof stream.read !== 'function') {
        stream = new Readable(opts).wrap(stream);
    }

    var ro = new Readable({ objectMode: opts && opts.objectMode });
    var waiting = false;

    stream.on('readable', function () {
        if (waiting) {
            waiting = false;
            ro._read();
        }
    });

    ro._read = function () {
        var buf, reads = 0;
        while ((buf = stream.read()) !== null) {
            ro.push(buf);
            reads++;
        }
        if (reads === 0) waiting = true;
    };
    stream.once('end', function () { ro.push(null) });
    stream.on('error', function (err) { ro.emit('error', err) });
    return ro;
};
