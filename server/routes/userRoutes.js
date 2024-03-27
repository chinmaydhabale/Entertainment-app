const express = require('express');
const { registerControllers, loginControllers, logOutController } = require('../controlers/usercontroler');
const { verifyToken } = require('../middleware/jwtauth');

const router = express.Router();

// Route to handle user registration
router.post('/register', registerControllers)

// Route to handle user login
router.post('/login', loginControllers)

// Route to handle logout user
router.get('/logout', verifyToken, logOutController)

module.exports = router;
