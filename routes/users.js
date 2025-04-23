const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post(
    '/:userId/assign-dealership/:dealershipId',
    userController.assignToDealership
);

module.exports = router;
