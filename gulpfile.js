var gulp = require('gulp');
var concat = require('gulp-concat-util');

gulp.task('build', function() {
	gulp.src(['./lib/*.js', './index.js'])
		.pipe(concat('mathp-generic-build.js', {
			process : function(src) {
				return src
					// Remove the 'Object elements retrieval' block from index.js
					.replace(/\/[\r\n]*\* Object elements retrieval \*\/[^]+\/\* Object elements retrieval end \*\/[\r\n]*/g, '')
					// Remove all "use strict";
					.replace(/[\r\n]*.*"use strict";?.*[\r\n]*/g, '\n')
					// Remoe all module.exports
					.replace(/[\r\n]*.*module.exports.*[\r\n]*/g, '\n')
					// Add a tab at the beginning of every lines
					.replace(/(^|\r*\n)/g, '\n\t')
					// Remove orphan tabs
					.replace(/\n\t(\n|$)/g, '\n\n');
			}
		}))
		.pipe(concat.header('(function() {\n\t"use strict";\n'))
		.pipe(concat.footer('\n\tmodule.exports = Mathp;\n}());'))
		.pipe(gulp.dest('build'));
});