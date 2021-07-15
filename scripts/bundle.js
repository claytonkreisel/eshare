var globby = require( "globby" );

var rollup = require( "rollup" ); 
var resolve = require( "rollup-plugin-node-resolve" ); 
var cjs = require( "rollup-plugin-commonjs" ); 
var json = require( "rollup-plugin-json" ); 

var bundleables = globby.sync( [
    "public/js/**/*.bundle.js"
] );

async function bundler(){
    await Promise.all(
        bundleables
            .map( async ( src ) => {
                let bundle = await rollup.rollup( { 
                    "input": src, 
                    "plugins": [ 
                        resolve(), 
                        cjs(), 
                        json() 
                    ] 
                } ); 
            
                await bundle.write( { 
                    "format": "esm", 
                    "file": src.replace( ".bundle", "" ) 
                } );
            } )
    );
}

bundler();