const express = require('express');
const router = express.Router();
const dealershipController = require('../controllers/dealershipController');

// POST /api/dealerships/:id/cars
router.post('/:id/cars', dealershipController.addCarToDealership);

// POST /api/dealerships
router.post('/', dealershipController.createDealership);

// GET /api/dealerships
router.get('/', dealershipController.getAllSortedByCars);

// GET /api/dealerships/:id
router.get('/:id', dealershipController.getDealershipDetails);

module.exports = router;
