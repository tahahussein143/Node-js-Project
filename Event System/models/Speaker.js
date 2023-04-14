module.exports = ( sequelize, DataTypes ) => {

    //#region Speaker table

    const Speaker = sequelize.define( 'speaker', {
        firstName: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING( 50 ),
            allowNull: false,
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
        facebook: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        linkedin: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        twitter: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
        instagram: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true
            }
        },
    } );

    //#endregion

    return Speaker;

}

