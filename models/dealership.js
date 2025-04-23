'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Dealership extends Model {
        static associate(models) {
            Dealership.hasMany(models.User, { foreignKey: 'dealershipId' });
            Dealership.hasMany(models.Car, {foreignKey: 'dealershipId'});
        }
    }

    Dealership.init(
        {
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Dealership',
            timestamps: false, 
            paranoid: true, 
        }
    );

    return Dealership;
};
