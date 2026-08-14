var vm = require('vm');
var path = require('path');
var browserify = require('../');
var test = require('./tap-adapter').test;

test('cached require results', function (t) {
    t.plan(1);

    var b = browserify();
    b.require(path.join(__dirname, 'fixtures', 'async-seq.js'), { expose: 'seq' });
    b.bundle(function (err, src) {
        var c = {};
        vm.runInNewContext(src, c);
        
        var seq0 = c.require('seq');
        var seq1 = c.require('seq');
        
        t.ok(seq0 === seq1);
    });
});
