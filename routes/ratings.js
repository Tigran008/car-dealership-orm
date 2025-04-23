const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');

router.post('/', ratingController.rateCar);

module.exports = router;
