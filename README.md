[![Dependency status](https://gemnasium.com/lgersman/orangevolt-livereload.png)](https://gemnasium.com/lgersman/orangevolt-livereload)
[![NPM version](https://badge.fury.io/js/orangevolt-livereload.png)](http://badge.fury.io/js/orangevolt-livereload)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/lgersman/orangevolt-livereload/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

##### **[orangevolt-livereload]** lets you easily edit your [Github] wiki pages (aka [Markdown] / [gfm] files) in your favorite editor while having live preview in the browser.

![orangevolt-livereload screencast](https://raw.github.com/lgersman/orangevolt-livereload/master/screencast.gif)

You dont need [Gollum] anymore - use your favorite editor. Just save the file and the browser reloads it automatically.

# Features

* [LiveReload] editing experience for your [Markdown] files. 

* [Grunt] integration

# Requirements

**[orangevolt-livereload]** requires [Grunt].

# Installation

``$ npm install orangevolt-livereload -g``

If you want to use **[orangevolt-livereload]** in your [Grunt] file you should install it locally (without ``-g`` option).

# Usage

## Command line

Go to your project directory and execute

````
$ orangevolt-livereload
```` 

A new browser window will appear displaying the contents of the directory. 

Select the file to watch and you're done !

## Grunt project integration

Add 

````javascript
watch : {
  all : {
    options: {
      livereload : 9091
    },
    files: [ 'README.md', /* add more files/directories to watch here */]
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
}
````

to your ``grunt.initConfig( ...)`` section and 

````javascript
...
grunt.loadNpmTasks( 'grunt-contrib');
grunt.loadNpmTasks( 'grunt-open'); 

grunt.registerTask( 'livereload', ['connect', 'open', 'watch']);
...
````
to the bottom of your [Grunt] file. Execute 

````
grunt livereload
````

and a new browser tab will appear. Select the file to watch  and you're done !

See [Gruntfile.js](Gruntfile.js) as a working example for the [Grunt] integration.

## Caveats

When ``grunt`` aborts with **Fatal error: watch ENOSPC** message you're system is getting out of 
inotify watche handles. 

Go to the terminal and enter 

````
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
````
to increase inotify watche handles (See http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc).

# License

**[orangevolt-livereload]** is dual licensed under

* [MIT](http://www.opensource.org/licenses/MIT)
* [GPL2](http://www.opensource.org/licenses/GPL-2.0)

[NPM]: 			https://npmjs.org/ 
[NodeJs]:		http://nodejs.org/
[gfm]: 			http://github.github.com/github-flavored-markdown/ "Github Flavored Markdown"
[Markdown]:		http://daringfireball.net/projects/markdown/syntax
[marked]:		https://github.com/chjj/marked	
[LiveReload]: 	http://livereload.com/
[Grunt]: 		http://gruntjs.com/ "GruntJS"
[Gollum]: 		https://github.com/gollum/gollum
[Highlight.js]: https://github.com/isagalaev/highlight.js 
[jsFiddle]:		http://jsfiddle.net/
[orangevolt-livereload]: https://github.com/lgersman/orangevolt-livereload "Orangevolt Docp"
[GitHub]:		https://github.com/
[FontAwesome]:	http://fontawesome.io/
[grunt connect]:https://github.com/gruntjs/grunt-contrib-connect
[grunt watch]:	https://github.com/gruntjs/grunt-contrib-watch
