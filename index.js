//#region variables

const express = require( 'express' );
const app = express();
const port = 3000;

//#endregion

//#region app server
app.listen( port, 'localhost', ( req, res ) => {
    console.log( `listening at http:/localhost:${port}` );
});
//#endregion

//#region routs
app.get( '/', ( req, res ) => {
    res.send( "Hello from server" );
} )
//#endregion 
