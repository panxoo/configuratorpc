const express = require('express');
const router = express.Router();
const composantsController = require('../controllers/composantsController');

router.get('/', composantsController.composants);
router.post('/', composantsController.register);
router.put('/', composantsController.update);

module.exports = router;