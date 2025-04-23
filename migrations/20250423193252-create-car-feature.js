'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('CarFeatures', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            carId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Cars',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            featureId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Features',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('CarFeatures');
    },
};
