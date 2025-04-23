const { Rating, User, Car } = require('../models');

const ratingController = {
    async rateCar(req, res) {
        try {
            const { user_id, car_id, rate } = req.body;

            if (rate < 0 || rate > 5) {
                return res
                    .status(400)
                    .json({ message: 'Rate must be between 0 and 5' });
            }

            const user = await User.findByPk(user_id);
            const car = await Car.findByPk(car_id);

            if (!user || !car) {
                return res
                    .status(404)
                    .json({ message: 'User or Car not found' });
            }

            const rating = await Rating.create({
                userId: user_id,
                carId: car_id,
                rate,
            });

            res.status(201).json({ message: 'Rating saved', rating });
        } catch (error) {
            res.status(500).json({ message: 'Error saving rating', error });
        }
    },
};

module.exports = ratingController;
