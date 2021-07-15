var childProcess = require( "child_process" );

function runScript( scriptPath, callback ){
    var invoked = false;
    var process = childProcess.fork( scriptPath );

    process.on( "error", function( err ){
        if( !invoked ){
            invoked = true;

            callback( err );
        }
    });

    process.on( "exit", function( code ){
        var err;

        if( !invoked ){
            invoked = true;
            err = code === 0 ? null : new Error( "exit code " + code );

            callback( err );
        }
    });

}

runScript( "scripts/parseTemplates.js", function( err ){
    if( err ){
        throw err;
    }

    runScript( "scripts/bundle.js", function( err ){
        if( err ){
            throw err;
        }
    } );
});