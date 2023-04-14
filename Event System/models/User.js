
module.exports = ( sequelize, DataTypes ) => {

    //#region User table
    
    const User = sequelize.define( 'user', {
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ // string has at least one number and character
            }
        },
        role: {
            type: DataTypes.ENUM( 'admin', 'user' ),
            validate: {
                isIn: ['admin', 'user']
            },
            defaultValue: 'user'
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
        }
    } );
    //#endregion

    return User;
};
