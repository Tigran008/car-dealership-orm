'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class CarFeature extends Model {
        static associate(models) {
            CarFeature.belongsTo(models.Car, { foreignKey: 'carId' });
            CarFeature.belongsTo(models.Feature, { foreignKey: 'featureId' });
        }
    }

    CarFeature.init(
        {
            carId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            featureId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'CarFeature',
            timestamps: false, 
        }
    );

    return CarFeature;
};
