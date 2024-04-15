const express = require('express');
const router = express.Router();

// authonthication middleware
const authMiddleware = require("../middleware/authMiddleware")

// user controllers
const { register, login, checkuser } = require('../controller/userController');

// login user
router.post('/login', login);

// register route
router.post('/register', register);

// check user
router.get('/check', authMiddleware,checkuser);


module.exports = router






module.exports = router;