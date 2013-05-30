module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['<%= concat.dist.dest %>', 'dist/js/scripts.min.js'],
    imagemin: {
      build: {
        files: [{
          expand: true,
          cwd: 'img',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'dist/img'
        }]
      }
    },
    svgmin: {
      options: {
        plugins: [{
          removeViewBox: false
        }]
      },
      dist: {
        files: {
          'dist/img/*.svg': 'img/*.svg'
        }
      },
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
          dest: 'dist/js/scripts.js'
        }
      },
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        dist: {
          files: {
            'dist/js/scripts.min.js': ['<%= concat.dist.dest %>']
          }
        }
      },
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
  // add image min
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['clean','svgmin','imagemin', 'jshint', 'concat', 'uglify', 'stylus']);

  };