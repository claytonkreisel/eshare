var path = require( "path" );
var fs = require( "fs" );

var globby = require( "globby" );
var Ractive = require( "ractive" );

var root = "public/html/";

function forcePosixSeparators( pathname ){
	return pathname.replace( /\\/g, path.posix.sep );
}
	
function ensureDirectory( filePath, includesFilename = true ){
	var directories = forcePosixSeparators( filePath ).split( path.posix.sep );
	var current = ".";

	if( includesFilename ){
		directories.pop();
	}

	directories.forEach( ( folder ) => {
		let exists = false;

		current += `/${folder}`;
		exists = fs.existsSync( current );

		if( !exists ){
			fs.mkdirSync( current );
		}
	} );
}
	
var templates = {};

function convertTemplate( filename, templates ){
	var parts = filename
		.replace( root, "" )
		.split( "/" );
	var storage = templates[ parts[ 0 ] ] || {};
	var restPath = parts.slice( 1 ).join( "/" );

	var template = fs.readFileSync( filename, "utf8" );

	storage[ restPath ] = Ractive.parse( template );

	templates[ parts[ 0 ] ] = storage;

	return templates;
}

globby.sync( [
    path.posix.join( root, "**/*.html" )
] ).forEach( ( filename ) => {
    templates = convertTemplate( filename, templates );
} );

ensureDirectory( root );
fs.writeFileSync( `${root}templates.js`, `var templates = ${JSON.stringify( templates )};\n\nexport default templates;`, "utf8" );
