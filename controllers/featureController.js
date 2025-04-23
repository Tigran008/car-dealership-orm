const { Car, Feature } = require('../models');

const featureController = {
    async addFeatureToCar(req, res) {
        try {
            const { carId, featureId } = req.body;

            const car = await Car.findByPk(carId);
            const feature = await Feature.findByPk(featureId);

            if (!car || !feature) {
                return res
                    .status(404)
                    .json({ message: 'Car or Feature not found' });
            }

            await car.addFeature(feature); 

            res.status(200).json({ message: 'Feature added to car' });
        } catch (error) {
            res.status(500).json({ message: 'Error adding feature', error });
        }
    },

    async removeFeatureFromCar(req, res) {
        try {
            const { carId, featureId } = req.body;

            const car = await Car.findByPk(carId);
            const feature = await Feature.findByPk(featureId);

            if (!car || !feature) {
                return res
                    .status(404)
                    .json({ message: 'Car or Feature not found' });
            }

            await car.removeFeature(feature);

            res.status(200).json({ message: 'Feature removed from car' });
        } catch (error) {
            res.status(500).json({ message: 'Error removing feature', error });
        }
    },
};

module.exports = featureController;
