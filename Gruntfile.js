module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			release: {
				files: {
					'dist/main.js': ['main.js']
				}
			}
		},
		cssmin: {
			release: {
				files: {
					'dist/style.css': ['style.css']
				}
			}
		},
		bump: {
			options: {
				files: ['package.json'],
				commit: false,
				createTag: false,
				push: false
			}
		},
		'string-replace': {
			'build-index': {
				files: {
					'index-production.html': ['index-production-template.html']
				},
				options: {
					replacements: [{
						pattern: /{{ VERSION }}/g,
						replacement: function(){
							return grunt.file.readJSON('package.json').version.replace(/\./g, '/');
						}
					}]
				}
			}
		},
		copy: {
			'file-versioning': {
				files: [{
					expand: true,
					flatten: true,
					src: ['dist/main.js', 'dist/style.css'],
					dest: 'dist/',
					rename: function(dest, src){
						return dest + grunt.file.readJSON('package.json').version.replace(/\./g, '/') + '/' + src;
					}
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-bump');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['uglify', 'cssmin', 'bump', 'string-replace', 'copy']);
};