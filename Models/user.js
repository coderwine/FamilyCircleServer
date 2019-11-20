module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        suffix: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        backupEmail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING(15),    //? 15 digit max to allow for international phone numbers
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATEONLY,  //! CHECK
            allowNull: false
        },
        dod: {
            type: DataTypes.DATEONLY,  //! CHECK
            allowNull: true
        },
        birthPlace: {
            type: DataTypes.STRING,
            allowNull: false
        },
        currentLocation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: false
        },
        about: {
            type: DataTypes.TEXT,  //!  CHECK - large text field
            allowNull: false
        },
        interest: {
            type: DataTypes.TEXT,  //!  CHECK - list... large text field
            allowNull: false
        },
        profilePic: {
            type: DataTypes.BLOB('long'),
            allowNull: false
        }

    })
    return User;
}