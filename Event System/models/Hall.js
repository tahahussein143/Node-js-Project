module.exports = ( sequelize, DataTypes ) => {
    //#region Hall table

    let Hall = sequelize.define( 'Hall', {
        name: {
            type: DataTypes.STRING( 50 ),
            allowNull: false
        },
        location: {
            type: DataTypes.STRING
        },
        capacity: {
            type: DataTypes.INTEGER
        }
    } );

    //#endregion

    return Hall;
};

