module.exports = function ( grunt) {
  grunt.initConfig({
    pkg   : grunt.file.readJSON( "package.json"),
    watch : {
      all : {
        options: {
          livereload : 9091
        },
        files: [ 'README.md']
      }
    },
    connect : {
      all : {
        options : {
          port        : 9090,
          middleware  : require( './').grunt.livereload.middleware(),
          hostname    : '*',
          livereload  : 9091,
          directory   : __dirname
        }        
      }
    },
    open : {
      all : {
        path : "http://localhost:9090/"
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib');
  grunt.loadNpmTasks( 'grunt-open'); 

  grunt.registerTask( 'readme', ['connect', 'open', 'watch']);
};