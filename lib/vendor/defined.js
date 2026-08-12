// Vendored from defined@1.0.1 (git://github.com/inspect-js/defined).
// Zero-dependency leaf inlined to keep browserify's runtime tree lean; MIT.
'use strict';

module.exports = function defined() {
	for (var i = 0; i < arguments.length; i++) {
		if (typeof arguments[i] !== 'undefined') {
			return arguments[i];
		}
	}
};
