'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Ratings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            rate: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Users', // 👈 Make sure your table name is plural here
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            carId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Cars', // 👈 Plural again
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Ratings');
    },
};
