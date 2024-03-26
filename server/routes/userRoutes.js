const express = require('express');
const { registerControllers, loginControllers } = require('../controlers/usercontroler');

const router = express.Router();

// Route to handle user registration
router.post('/register', registerControllers)

// Route to handle user login
router.post('/login', loginControllers)

module.exports = router;
