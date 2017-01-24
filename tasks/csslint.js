/**
 * Created by bmysoreshankar on 1/24/17.
 */
'use strict';

module.exports = function csslint(grunt) {
	grunt.loadNpmTasks('grunt-contrib-csslint');

	// Currently we do not have any of our own css files. We only have library css files, which we should not lint.
	// If we later add our own css files, this should be updated to include them. We should also minify them as well.
	// The lint task is run before build, not after. Instead we use lesslint which will show us the location of any
	// issues in the proper source file.
	return {
		options: {
			csslintrc: '.csslintrc'
		},
		strict: {
			src: ['public/style/*.css']
		}
	};
};
