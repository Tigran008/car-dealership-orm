'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Rating extends Model {
        static associate(models) {
            Rating.belongsTo(models.User, { foreignKey: 'userId' });
            Rating.belongsTo(models.Car, { foreignKey: 'carId' });
        }
    }

    Rating.init(
        {
            rate: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 5,
                },
            },
            userId: DataTypes.INTEGER,
            carId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Rating',
            timestamps: false,
        }
    );

    return Rating;
};
