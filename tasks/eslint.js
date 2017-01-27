'use strict';

var serverJS = [
	'index.js',
	'Gruntfile.js',
	'routes/*.js',
	'lib/*.js',
	'tasks/*.js',
	'controllers/**/*.js',
	'controllers/*.js',
	'models/**/*.js'
];
var browserJS = [
	'public/js/*.js',
	'public/modules/**/x*.js',
	'public/shared/**/*.js'
];
var testJS = [
	'test/*.js'
];

module.exports = function eslint(grunt) {
	grunt.loadNpmTasks('grunt-eslint');

	return {
		options: {
			config: '.eslintrc'
		},
		server: {
			config: '.eslintrc',
			src: serverJS
		},
		browser: {
			config: '.eslintrc',
			src: browserJS
		},
		test: {
			config: '.eslintrc',
			src: testJS
		}
	};
};
