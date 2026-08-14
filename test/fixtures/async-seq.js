// Local test fixture replacing the abandoned `seq` package. Provides just the
// asynchronous parMap_/seq chain the bundle tests exercise: map each item
// through an async fn (via next.ok), then invoke seq() with the results spread.
module.exports = function seq(items) {
    var results = new Array(items.length);
    var pending = items.length;
    var done = pending === 0;
    var onDone = null;

    var api = {
        parMap_: function (fn) {
            items.forEach(function (x, i) {
                var next = {
                    ok: function (v) {
                        results[i] = v;
                        if (--pending === 0) { done = true; if (onDone) onDone(); }
                    }
                };
                fn(next, x);
            });
            return api;
        },
        seq: function (cb) {
            function fire() { cb.apply(null, results); }
            if (done) fire(); else onDone = fire;
            return api;
        }
    };
    return api;
};
