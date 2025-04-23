'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Dealership, { foreignKey: 'dealershipId' });
            User.hasMany(models.Rating, { foreignKey: 'userId' });
        }
    }

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: { isEmail: true },
            },
            dealershipId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'User',
            timestamps: false,
        }
    );

    return User;
};
