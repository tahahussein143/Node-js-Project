const dbConfig = require( '../config/dbConfig.js' );
const { Sequelize, DataTypes, Model } = require( 'sequelize' );
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        define: {
            timestamps: false,
        },
        // logging: false,
    }

);

sequelize.authenticate()
    .then( () => {
        console.log( 'connected ..' );
    } )
    .catch( ( err ) => {
        console.log( err.message );
    } );

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require( './User.js' )( sequelize, DataTypes );
db.events = require( './Event.js' )( sequelize, DataTypes );
db.attends = require( './Attend.js' )( sequelize, DataTypes );
db.attendees = require( './Attendee.js' )( sequelize, DataTypes );
db.halls = require( './Hall.js' )( sequelize, DataTypes );
db.eventHalls = require( './EventHall.js' )( sequelize, DataTypes );
db.feedbacks = require( './Feedback.js' )( sequelize, DataTypes );
db.speakers = require( './Speaker.js' )( sequelize, DataTypes );
db.subEvents = require( './SubEvent.js' )( sequelize, DataTypes );

( async () => {

    db.users.hasMany( db.events, { foreignKey: { name: 'creatorId', allowNull: false } } );

    db.events.hasMany( db.subEvents );

    db.events.belongsToMany( db.speakers, { through: 'eventSpeakers' } );

    db.events.belongsToMany( db.halls, { through: db.eventHalls } );

    db.events.belongsToMany( db.attendees, { through: db.attends } );

    db.events.belongsToMany( db.attendees, { through: db.feedbacks } );

    // db.sequelize.sync( { logging: false } )
    //     .then( () => {
    //         console.log( 're-sync done!' );
    //     } );

} )();



( async () => {

    // let user = await User.create( { firstName: 'firstUser' } );
    // console.log( user.toJSON() );
    // let event = await user.createEvent( { title: 'event1' } );
    // await user.createEvent( { title: 'event2' } );
    // await user.createEvent( { title: 'event3' } );
    // console.log( user.toJSON(), event.toJSON() );

    // let user = await User.findOne( { where: { Id: 1 } } );
    // let event = await user.createEvent( { title: 'event10' } );
    // console.log(user, event);

    // let user = await User.create( { firstName: 'firstUser' } );
    // console.log( user.toJSON() );
    // let event = await user.createEvent( { title: 'event1' } );
    // console.log( event.toJSON() );
    // let hall = await event.createHall( { name: 'Hall1' } );
    // console.log( hall.toJSON() );


} );//();




module.exports = db;