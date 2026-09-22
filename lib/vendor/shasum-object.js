// Vendored from shasum-object@1.0.1 (https://github.com/goto-bus-stop/shasum-object).
// Flagged abandoned (last release September 2025). Apache-2.0, not MIT like
// the rest of this tree — see shasum-object.LICENSE alongside this file.
// Copied verbatim but for this header and the omission described below.
//
// Its only dependency, fast-safe-stringify (2021), serves a branch browserify
// never reaches: the sole call site is `shasum(row.source)` in `_syntax`, and
// `row.source` is always a string there — `_unshebang` runs `.replace()` on it
// immediately before, and `syntaxError()` is handed it immediately after. The
// stable-stringify path for non-string, non-Buffer input is therefore not
// reproduced, and both packages leave the tree.
'use strict';

var createHash = require('crypto').createHash;

module.exports = function shasum(input, hash, digest) {
	if (!hash) hash = 'sha1';
	if (!digest) digest = 'hex';

	return createHash(hash)
		.update(input, typeof input === 'string' ? 'utf8' : undefined)
		.digest(digest);
};
