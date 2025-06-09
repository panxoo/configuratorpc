const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.get('/:id', userController.user);
router.post('/', userController.register);
router.put('/', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
