/*global module:false*/
module.exports = function (grunt) {
  var path = require('path');
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', [
    'clean:tmp',
    'clean:dist',
    'copy:dist',
    'requirejs',
    'less',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin'
  ]);

  grunt.registerTask('latest', [
    'default',
    'clean:latest',
    'copy:latest'
  ]);

  grunt.registerTask('release', [
    'default',
    'clean:release',
    'copy:release'
  ]);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    tmpDir: 'tmp',
    distDir: 'dist',
    bowerDir: 'bower_components',
    clean: {
      tmp: '<%= tmpDir %>',
      dist: 'dist',
      release: {
        src: ['_output/<%= pkg.version %>/']
      },
      latest: {
        src: ['_output/latest/']
      }
    },
    jshint: {
      options: {
        ignores: ["bower_components/**/*.*", "node_modules/**/*.*", "dist/**/*.*", "tmp/**/*.*"],
        eqnull: true,
        newcap: false,
        debug: true
      },
      scripts: ['Gruntfile.js', '**/*.js']
    },
    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: [
              '<%= bowerDir %>/**/*',
              '*main*.js',
              '*.html'
            ],
            dest: '<%= tmpDir %>'
          }
        ]
      },
      release: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: '**',
          dest: '_output/<%= pkg.version %>/'
        }]
      },
      latest: {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: '**',
          dest: '_output/latest/'
        }]
      }
    },
    less: {
      dist: {
        files: [
          {
            'css/main.css': [
              '<%= bowerDir %>/**/*main.less',
              'css/main.less'
            ]
          }
        ]
      }
    },
    requirejs: {
      dist: {
        options: {
          appDir: '<%= tmpDir %>',
          baseUrl: '<%= bowerDir %>',
          mainConfigFile: '<%= tmpDir %>/main.js',
          paths: {
          },
          findNestedDependencies: true,
          wrapShim: true,
          skipDirOptimize: true,
          skipModuleInsertion: true,
          useStrict: true,
          optimize: 'none',
          optimizeCss: 'none',
          dir: '<%= distDir %>',
          buildCSS: false,
          modules: [
            {
              name: '<%= pkg.name %>/main'
            }
          ]
        }
      }
    },
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= distDir %>/*.html',
      options: { dest: '<%= distDir %>' }
    },
    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= distDir %>/*.html'],
      options: { assetsDirs: ['<%= distDir %>'] }
    },
    cssmin: {
       dist: {
         files: {
             '<%= distDir %>/css/main.css': '<%= distDir %>/css/main.css'
         }
       }
      },
    processhtml: {
      options: { process: true },
      dist: { files: { '<%= distDir %>/index.html': '<%= tmpDir %>/index.html' } }
    }
  });
};
