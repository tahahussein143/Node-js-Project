//#region liberaries
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const multer = require( 'multer' );
const logger = require( 'morgan' );
const ejs = require( 'ejs' );
const ejsLayouts = require( 'express-ejs-layouts' );
const { Model } = require( 'sequelize' );
//#endregion 

//#region variables
const app = express();
const port = 3000;
const db = require( './models' );
const eventRouter = express.Router();
const userRouter = express.Router();
const speakerRouter = express.Router();
const hallRouter = express.Router();
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

app.set( "layout extractScripts", true )

app.use( '/event', eventRouter );
app.use( '/user', userRouter );
app.use( '/speaker', speakerRouter );
app.use( '/hall', hallRouter );

eventRouter.use( app );

// app.disable( 'etag' );

//#endregion

//#region All Routs

app.get( '/', ( req, res ) => {

    ( async () => {
        let [events] = await db.sequelize.query(
            `select e.id, e.title, eh.date 
            from events e join eventHalls eh on e.id = eh.eventId;`
        )
        console.log(events);
        res.render( 'home', { events } );
    } )();

} )

eventRouter.get( '/:id', ( req, res ) => {
    const id = req.params.id;
    ( async () => {
        let [[event]] = await db.sequelize.query(
            `select e.*, eh.date from
             events e join eventHalls eh on e.id = eh.eventId where e.id = ${id}`
        );
        let [[hall]] = await db.sequelize.query(
            `select * from
             halls h where h.id IN (select eh.hallId from eventHalls eh where eh.eventId = ${id})`
        );
        let [speakers] = await db.sequelize.query(
            `select concat(firstName, ' ', lastName) as name, id
            from speakers s
            where s.id in  (select es.speakerid from eventSpeakers es WHERE es.eventId = ${id})`
        );
        console.log( speakers );
        res.render( 'event-details', { event, hall, speakers } );
    } )();
} );

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
                res.status( 500 ).send( err )
            } ) )
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

} )
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

//#region speaker routes
speakerRouter.get( '/', ( req, res ) => {
    db.speakers.findAll()
        .then( ( speakers => {
            res.send( speakers );
        } ) )
        .catch( ( err ) => res.status( 500 ).send( err.message ) );
} );

speakerRouter.route( '/create' )
    .post( ( req, res ) => {
        const event = req.body;
        db.speakers.create( event )
            .then( ( createdspeaker => {
                res.send( {
                    message: 'speaker created successfully',
                    speaker: createdspeaker
                } );
            } ) )
            .catch( ( err => {
                res.status( 500 ).send( err )
            } ) )
    } );

speakerRouter.get( '/:id', ( req, res ) => {
    const id = req.params.id;
    db.speakers.findByPk( id )
        .then( speaker => res.send( speaker ) )
        .catch( err => res.status( 500 ).send( err.message ) );
} );

speakerRouter.delete( '/delete/:id', ( req, res ) => {
    const id = req.params.id;
    db.speakers.destroy( { where: { id: id } } )
        .then( ( rawsCount ) => {
            res.status( 200 ).send(
                {
                    message: 'speaker deleted successfully!',
                    effectedRaws: rawsCount,
                }
            );
        } )
        .catch( err => res.status( 500 ).send( err.message ) );

} )
//#endregion

//#region hall routes
hallRouter.get( '/', ( req, res ) => {
    db.halls.findAll()
        .then( ( halls => {
            res.send( halls );
        } ) )
        .catch( ( err ) => res.status( 500 ).send( err.message ) );
} );

hallRouter.route( '/create' )
    .post( ( req, res ) => {
        const hall = req.body;
        db.halls.create( hall )
            .then( ( createdhall => {
                res.send( {
                    message: 'speaker created successfully',
                    hall: createdhall
                } );
            } ) )
            .catch( ( err => {
                res.status( 500 ).send( err )
            } ) )
    } );

hallRouter.get( '/:id', ( req, res ) => {
    const id = req.params.id;
    db.halls.findByPk( id )
        .then( hall => res.send( hall ) )
        .catch( err => res.status( 500 ).send( err.message ) );
} );

hallRouter.delete( '/delete/:id', ( req, res ) => {
    const id = req.params.id;
    db.halls.destroy( { where: { id: id } } )
        .then( ( rawsCount ) => {
            res.status( 200 ).send(
                {
                    message: 'hall deleted successfully!',
                    effectedRaws: rawsCount,
                }
            );
        } )
        .catch( err => res.status( 500 ).send( err.message ) );

} )
//#endregion


//#endregion