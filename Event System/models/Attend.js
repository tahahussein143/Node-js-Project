module.exports = ( sequelize, DataTypes ) => {
    //#region Attend
    let Attend = sequelize.define( 'Attend', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn( 'now' ),
        }
    } );
    //#endregion

    return Attend;
};
