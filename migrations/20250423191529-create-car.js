'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Cars', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            make: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            model: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dealershipId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Dealerships',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Cars');
    },
};
