const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// POST /api/users/:userId/assign-dealership/:dealershipId
router.post(
    '/:userId/assign-dealership/:dealershipId',
    userController.assignToDealership
);

module.exports = router;
