'use strict'

// Vendored replacement for the abandoned `stream-browserify` package. Its whole
// job was to provide the `stream` builtin polyfill by re-exporting readable-stream.
// @unabandoned/readable-stream (which browserify already depends on, and which the
// `readable-stream` builtin also resolves to) is a full userland copy of Node's
// `stream` module -- it already exports Stream, Readable, Writable, Duplex,
// Transform, PassThrough, finished, pipeline, promises, etc. -- so re-export it
// directly rather than reconstructing the shape (and mutating its read-only
// getters). This also keeps the `stream` and `readable-stream` builtins in sync.
module.exports = require('readable-stream')
