const express = require('express');
const router = express.Router();
const userAuthController = require('../controllers/userAuthController');    

// routes d'authentification

router.post('/login', userAuthController.login);
router.post('/register', userAuthController.register);

module.exports = router;