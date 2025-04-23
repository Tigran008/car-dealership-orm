'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Car extends Model {
        static associate(models) {
            Car.belongsTo(models.Dealership, { foreignKey: 'dealershipId' });
            Car.hasMany(models.Rating, { foreignKey: 'carId' });
            Car.belongsToMany(models.Feature, {
                through: 'CarFeatures',
                foreignKey: 'carId',
            });
        }
    }

    Car.init(
        {
            make: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dealershipId: {
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: 'Car',
            timestamps: false,
        }
    );

    return Car;
};
