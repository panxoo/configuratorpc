const express = require('express');
const router = express.Router();
const composantsController = require('../controllers/composantsController');
const upload = require('../middlewares/uploadFile');
const requireRole = require('../middlewares/requireRoleMiddlewares');

router.get('/', composantsController.composants);
router.get('/:id', composantsController.composant);
router.post('/', upload.single('image'), requireRole(['admin']), composantsController.register);
router.put('/', upload.single('image'), requireRole(['admin']), composantsController.update);
router.delete('/:id', requireRole(['admin']), composantsController.delete);

module.exports = router;
