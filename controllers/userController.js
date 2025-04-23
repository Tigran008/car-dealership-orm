const { User, Dealership } = require('../models');

const userController = {
    async assignToDealership(req, res) {
        try {
            const { userId, dealershipId } = req.params;

            // Validate existence
            const user = await User.findByPk(userId);
            const dealership = await Dealership.findByPk(dealershipId);

            if (!user || !dealership) {
                return res
                    .status(404)
                    .json({ message: 'User or Dealership not found' });
            }

            // Assign user to dealership
            user.dealershipId = dealershipId;
            await user.save();

            res.status(200).json({
                message: 'User assigned to dealership successfully',
                user,
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error assigning user to dealership',
                error,
            });
        }
    },
};

module.exports = userController;
