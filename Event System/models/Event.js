
module.exports = ( sequelize, DataTypes ) => {
    //#region Event table

    const Event = sequelize.define( 'Event', {
        title: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING
        },
        ticketPrice: {
            type: DataTypes.DECIMAL
        }
    } );

    //#endregion

    return Event;

};
