module.exports = ( sequelize, DataTypes ) => {
    //#region Attendee table
    let Attendee = sequelize.define( 'Attendee', {
        firstName: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            }
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                isNumeric: true
            }
        },

        gender: {
            type: DataTypes.ENUM( 'male', 'female' ),
            validate: {
                isIn: ['male', 'female']
            }
        },
        country: {
            type: DataTypes.STRING( 30 )
        },
        city: {
            type: DataTypes.STRING( 30 )
        },
    } );
    //#endregion
    return Attendee;
};

