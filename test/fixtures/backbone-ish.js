// Local test fixture replacing the abandoned `backbone` package: a module with
// a fixed set of named exports, used to verify a bundled module's export surface
// round-trips through browserify.
module.exports = {
    Model: function Model() {},
    View: function View() {},
    Collection: function Collection() {},
    Router: function Router() {},
    VERSION: '0.0.0'
};
