module.exports = ( sequelize, DataTypes ) => {
    //#region EventHall table

    let EventHall = sequelize.define( 'EventHall', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    } );

    //#endregion

    return EventHall;
};



