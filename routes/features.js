const express = require('express');
const router = express.Router();
const featureController = require('../controllers/featureController');

router.post('/add', featureController.addFeatureToCar);
router.delete('/remove', featureController.removeFeatureFromCar);

module.exports = router;
