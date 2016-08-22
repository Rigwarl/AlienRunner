module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dev: {
        options: {
          browserifyOptions: {
            debug: true,
          },
          transform: [['babelify', { presets: ['es2015'] }]],
        },
        files: {
          'app/js/build/app.js': 'app/js/src/app.js',
        },
      },
    },
    copy: {
      js: {
        expand: true,
        flatten: true,
        src: ['app/js/lib/*.js', 'node_modules/babel-polyfill/dist/polyfill.min.js'],
        dest: 'app/js/build/',
      },
    },
    clean: ['app/js/build'],
    connect: {
      server: {
        options: {
          port: 9001,
          open: true,
          base: 'app',
        },
      },
    },
    watch: {
      options: {
        spawn: false,
        livereload: true,
      },
      js: {
        files: ['app/js/src/**/*.js'],
        tasks: ['browserify'],
      },
      all: {
        files: ['app/*', '!app/js/src'],
      },
    },
  });

  grunt.registerTask('build', ['clean', 'copy', 'browserify']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);
};
