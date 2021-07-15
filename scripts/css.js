var fs = require( "fs" );

var globby = require( "globby" );

var files = globby.sync( [
    "node_modules/normalizecss/normalize.css", 
    "node_modules/leaflet/dist/leaflet.css",
    "public/css/**/*.css"
] );

var styles = files.reduce( ( style, src ) => {
    style += fs.readFileSync( src, "utf8" );

    return style;
}, "" );

fs.writeFileSync( "public/index.css", styles, "utf8" );