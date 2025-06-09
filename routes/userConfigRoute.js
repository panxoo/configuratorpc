const express = require('express');
const router = express.Router();
const userConfigController = require('../controllers/userConfigController');

router.get('/', userConfigController.getAllConfig);
router.get('/:id', userConfigController.getConfig);
router.post('/', userConfigController.register);
router.put('/', userConfigController.update);
router.delete('/:id', userConfigController.delete);

module.exports = router;
