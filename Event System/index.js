//#region liberaries
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const fs = require( 'fs' );
const multer = require( 'multer' );
const logger = require( 'morgan' );
const ejs = require( 'ejs' );
const ejsLayouts = require( 'express-ejs-layouts' );
const db = require( './models' );
const { Model } = require( 'sequelize' );
//#endregion 

//#region variables
const app = express();
const port = 3000;
const eventRouter = express.Router();
const userRouter = express.Router();
//#endregion

//#region app server
app.listen( port, 'localhost', ( req, res ) => {
    console.log( `app is listening at http://localhost:${port}` );
} );
//#endregion

//#region View engine setup
app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( __dirname, 'views' ) ); // E:\nodejs project\Event System   +  \views
//#endregion

//#region Middleware
app.use( bodyParser.urlencoded( { extended: true } ) ); // parse application/x-www-form-urlencoded

app.use( bodyParser.json() ); // parse application/json

app.use( multer().array() ); // parse multipart/form-data

app.use( bodyParser.text() ); // parse text/html

app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( logger( 'tiny' ) );

app.use( ejsLayouts );

app.use( '/event', eventRouter );
app.use( '/user', userRouter );
// app.disable( 'etag' );

//#endregion

//#region All Routs

//#region event routes
eventRouter.get( '/', ( req, res ) => {
    db.events.findAll()
        .then( ( events => {
            res.send( events );
        } ) )
        .catch( ( err ) => res.status( 500 ).send( err.message ) );
} );

eventRouter.route( '/create' )
    .post( ( req, res ) => {
        const event = req.body;
        db.events.create( event )
            .then( ( createdEvent => {
                res.send( {
                    message: 'event created successfully',
                    event: createdEvent
                } );
            } ) )
            .catch( ( err => {
                res.status(500).send(err)
            }))
    } );

eventRouter.get( '/:id', ( req, res ) => {
    const id = req.params.id;
    db.events.findByPk( id )
        .then( event => res.send( event ) )
        .catch( err => res.status( 500 ).send( err.message ) );
} );

eventRouter.delete( '/delete/:id', ( req, res ) => {
    const id = req.params.id;
    db.events.destroy( { where: { id: id } } )
        .then( ( rawsCount ) => {
            res.status( 200 ).send(
                {
                    message: 'event deleted successfully!',
                    effectedRaws: rawsCount,
                }
            );
        } )
        .catch( err => res.status( 500 ).send( err.message ) );

})
//#endregion

//#region user routes
userRouter.get( '/', ( req, res ) => {
    db.users.findAll()
        .then( ( users => {
            res.send( users );
        } ) )
        .catch( ( err ) => res.status( 500 ).send( err.message ) );
} );

userRouter.route( '/create' )
    .post( ( req, res ) => {
        const user = req.body;
        db.users.create( user )
            .then( ( createdUser => {
                res.send( {
                    message: 'user created successfully',
                    event: createdUser
                } );
            } ) )
            .catch( ( err => {
                res.status( 500 ).send( err )
            } ) )
    } );

userRouter.get( '/:id', ( req, res ) => {
    const id = req.params.id;
    db.users.findByPk( id )
        .then( user => res.send( user ) )
        .catch( err => res.status( 500 ).send( err.message ) );
} );

userRouter.delete( '/delete/:id', ( req, res ) => {
    const id = req.params.id;
    db.users.destroy( { where: { id: id } } )
        .then( ( rawsCount ) => {
            res.status( 200 ).send(
                {
                    message: 'user deleted successfully!',
                    effectedRaws: rawsCount,
                }
            );
        } )
        .catch( err => res.status( 500 ).send( err.message ) );

} )
//#endregion


//#endregion