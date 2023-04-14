module.exports = ( sequelize, DataTypes ) => {

    //#region SubEvent table

    let SubEvent = sequelize.define( 'SubEvent', {
        topic: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE
        }
    } );

    //#endregion

    return SubEvent;

}

