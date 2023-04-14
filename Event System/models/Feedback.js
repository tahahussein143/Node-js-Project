module.exports = ( sequelize, DataTypes ) => {
    //#region Feedback
    let Feedback = sequelize.define( 'Feedback', {
        comment: {
            type: DataTypes.TEXT,
        },
        stars: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.fn( 'now' )
        }

    } );
    //#endregion

    return Feedback;
};
