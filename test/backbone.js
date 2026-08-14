var browserify = require('../');
var vm = require('vm');
var path = require('path');
var fixture = require('./fixtures/backbone-ish');
var test = require('./tap-adapter').test;

test('module export keys round-trip through a bundle', function (t) {
    t.plan(3);
    var b = browserify();
    b.require(path.join(__dirname, 'fixtures', 'backbone-ish.js'), { expose: 'backbone' });
    b.bundle(function (err, buf) {
        t.ok(Buffer.isBuffer(buf));
        var src = buf.toString('utf8');
        t.ok(src.length > 0);

        var c = { console: console };
        vm.runInNewContext(src, c);
        t.deepEqual(
            Object.keys(fixture).sort(),
            Object.keys(c.require('backbone')).sort()
        );
        t.end();
    });
});
