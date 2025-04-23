const Sequelize = require('sequelize');
const { Dealership, Car } = require('../models');
const { fn, col, literal } = Sequelize;

const dealershipController = {
    async createDealership(req, res) {
        try {
            const { name, address, description } = req.body;

            if (!name || !address) {
                return res
                    .status(400)
                    .json({ message: 'Name and address are required' });
            }

            const dealership = await Dealership.create({
                name,
                address,
                description,
            });

            res.status(201).json({
                message: 'Dealership created successfully',
                dealership,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error creating dealership',
                error,
            });
        }
    },

    async addCarToDealership(req, res) {
        try {
            const dealershipId = req.params.id;
            const { make, model } = req.body;

            const dealership = await Dealership.findByPk(dealershipId);
            if (!dealership) {
                return res
                    .status(404)
                    .json({ message: 'Dealership not found' });
            }

            const car = await Car.create({
                make,
                model,
                dealershipId,
            });

            res.status(201).json({ message: 'Car added to dealership', car });
        } catch (error) {
            res.status(500).json({
                message: 'Error adding car to dealership',
                error,
            });
        }
    },

    async getAllSortedByCars(req, res) {
        try {
            const dealerships = await Dealership.findAll({
                attributes: {
                    include: [[fn('COUNT', col('Cars.id')), 'carCount']],
                },
                include: [
                    {
                        model: Car,
                        attributes: [],
                    },
                ],
                group: ['Dealership.id'],
                order: [[literal('carCount'), 'DESC']],
            });

            res.status(200).json(dealerships);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching dealerships',
                error,
            });
        }
    },
    async getDealershipDetails(req, res) {
        try {
            const dealershipId = req.params.id;

            const dealership = await Dealership.findByPk(dealershipId, {
                attributes: ['id', 'name', 'address', 'description'],
                include: [
                    {
                        model: User,
                        attributes: ['username', 'email'],
                    },
                    {
                        model: Car,
                        attributes: ['id', 'make', 'model'],
                        include: [
                            {
                                model: Feature,
                                attributes: ['name'],
                            },
                            {
                                model: Rating,
                                attributes: ['rate'],
                                include: {
                                    model: User,
                                    attributes: ['username'],
                                },
                            },
                        ],
                    },
                ],
            });

            if (!dealership) {
                return res
                    .status(404)
                    .json({ message: 'Dealership not found' });
            }

            const carsWithAvgRating = dealership.Cars.map((car) => {
                const total = car.Ratings.reduce((sum, r) => sum + r.rate, 0);
                const avgRating =
                    car.Ratings.length > 0
                        ? (total / car.Ratings.length).toFixed(2)
                        : null;

                return {
                    id: car.id,
                    make: car.make,
                    model: car.model,
                    features: car.Features.map((f) => f.name),
                    averageRating: avgRating,
                    ratings: car.Ratings.map((r) => ({
                        username: r.User.username,
                        rate: r.rate,
                    })),
                };
            });

            const result = {
                id: dealership.id,
                name: dealership.name,
                address: dealership.address,
                description: dealership.description,
                users: dealership.Users,
                cars: carsWithAvgRating,
            };

            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error fetching dealership details',
                error,
            });
        }
    }
};

module.exports = dealershipController;
