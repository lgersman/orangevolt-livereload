/*
 * https://github.com/lgersman/orangevolt-livereload
 * http://www.orangevolt.com
 *
 * Copyright 2013, Lars Gersmann <lars.gersmann@gmail.com>
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */

var path		= require( 'path'), 
	fs			= require( 'fs'), 
	ejs			= require( 'ejs'),
	marked		= require( 'marked'), 
	highlight	= require( 'highlight.js')
;

function createGrundConnectMiddleware( options, middleware) {
	return function( connect, options) {
		var directory = options.directory || options.base[options.base.length - 1];

		var middlewares = [];

		middlewares.push( middleware);
		
		  // copied from grunt-connect task
		if (!Array.isArray( options.base)) {
		  options.base = [ options.base];
		}
		options.base.forEach(function( base) {
			// Serve static files.
		  middlewares.push( connect.static( base));
		});

			// make orangevolt-docp package private resources available
			// in case they are not provided by the "edited" package
		middlewares.push( connect.static( __dirname));

			// Make directory browse-able.
		middlewares.push( connect.directory( directory));

		return middlewares;
	};
}

marked.setOptions({
  	highlight: function( code, lang) {
  		if( lang) {
  			return highlight.highlight( lang, code).value;
  		} else {
  			return highlight.highlightAuto( code).value;
  		}
	}
});

module.exports.grunt = {
	livereload : {
		middleware : function( options) {
			options = options || {};
			return createGrundConnectMiddleware( options, function( req, res, next) { 
					var p = path.resolve( '.' + req._parsedUrl.pathname);
					if( fs.existsSync( p) && fs.lstatSync( p).isFile() && /\.(md|markown|wiki)$/.test( p)) {
						if( req.headers['x-requested-with']) {
							var content = fs.readFileSync( p, "utf-8");
							res.end( marked( content));
						} else {
							res.end( 
								ejs.render( 
									fs.readFileSync( path.join( __dirname, 'template.ejs'), "utf-8"), {
									url		: req._parsedUrl.pathname,
									file	: p,
									context : options.context || {}
							  	})
							);
						}
					} else {
						next();
					}
				}
			);
		}
	} 
};