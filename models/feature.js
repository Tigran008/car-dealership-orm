'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Feature extends Model {
        static associate(models) {
            Feature.belongsToMany(models.Car, {
                through: {
                    model: 'CarFeatures',
                    timestamps: false,
                },
                foreignKey: 'featureId',
            });
        }
    }

    Feature.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Feature',
            timestamps: false,
        }
    );

    return Feature;
};
