try {
  var Backbone = require('minimist');
  throw new Error('module included');
} catch (e) {
  if (e.message === 'module included') {
    throw e;
  } else {
    t.ok(true);
  }
}