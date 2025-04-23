const express = require('express');
const router = express.Router();
const dealershipController = require('../controllers/dealershipController');

router.post('/:id/cars', dealershipController.addCarToDealership);

router.post('/', dealershipController.createDealership);

router.get('/', dealershipController.getAllSortedByCars);

router.get('/:id', dealershipController.getDealershipDetails);

module.exports = router;
