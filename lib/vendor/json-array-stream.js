// Minimal stand-in for JSONStream.stringify() with its default delimiters,
// vendored so browserify's CLI no longer pulls the abandoned JSONStream
// (and its jsonparse + through subtree) just to print `--deps` output.
//
// Object-mode in, byte-stream out: emits a JSON array, one written value at a
// time, matching JSONStream.stringify()'s defaults exactly -- open '[\n',
// separator '\n,\n', close '\n]\n', each value serialized with JSON.stringify
// at indent 0. An empty stream still yields a well-formed '[\n\n]\n'.
var Transform = require('stream').Transform;

module.exports = function jsonArrayStream() {
    var first = true;
    return new Transform({
        writableObjectMode: true,
        transform: function (row, enc, next) {
            this.push((first ? '[\n' : '\n,\n') + JSON.stringify(row));
            first = false;
            next();
        },
        flush: function (next) {
            if (first) this.push('[\n');
            this.push('\n]\n');
            next();
        }
    });
};
