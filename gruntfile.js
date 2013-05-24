module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js', 'js/**/*.js', '!js/_modernizr.custom.min.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          browser: true,
          document: true
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/*.js'],
        dest: 'dist/js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    clean: ['<%= concat.dist.dest %>'],
    stylus: {
      compile: {
        options: {
          paths: ['css'],
          // use: [require('css/__init')],
          import: ['../node_modules/nib/lib/nib']
        },
        files: {
          'dist/css/style.css': ['css/*.styl']
        }
      }
    },
    watch: {
      scripts: {
        files: ['<%= concat.dist.src %>'],
        tasks: ['jshint', 'concat'],
        options: {
          // nospawn: true
        }
      },
      styles: {
        files: ['css/*.styl'],
        tasks: ['stylus'],
        options: {
          // nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint','concat','uglify','clean', 'stylus']);

};