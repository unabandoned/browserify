// Shim for Node's internal _stream_readable module. readable-stream >=3 dropped
// the per-stream entry points (readable-stream/readable.js); expose the class
// from readable-stream's named exports instead.
module.exports = require('readable-stream').Readable;
