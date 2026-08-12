// Shim for Node's internal _stream_writable module. readable-stream >=3 dropped
// the per-stream entry points (readable-stream/writable.js); expose the class
// from readable-stream's named exports instead.
module.exports = require('readable-stream').Writable;
