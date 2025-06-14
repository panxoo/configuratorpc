const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const requireRole = require('../middlewares/requireRoleMiddlewares');

router.get('/', requireRole(['admin']), userController.getAll);
router.get('/detail', userController.user);
router.put('/', userController.update);
router.put('/password', userController.updatePassword);
router.delete('/:id', userController.delete);

module.exports = router;
