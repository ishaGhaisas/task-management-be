const User = require('../models/User');
require('dotenv').config();

module.exports = app => {
    app.get('/user-info/:id', async (req, res) => {
        const userId = req.params.id;
        try {
            const user = await User.findById(userId); 

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
    
            res.status(200).json({
                success: true,
                result: user,
            });
        } catch (error) {
            console.error("Error fetching user info:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    });
}