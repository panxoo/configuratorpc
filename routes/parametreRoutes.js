const express = require('express');
const router = express.Router();
const parametreController = require('../controllers/parametreController');
const requireRole = require('../middlewares/requireRoleMiddlewares');

router.get('/categories', parametreController.categories);
router.post('/categories', requireRole(['admin']), parametreController.addCategories);
router.put('/categories', requireRole(['admin']), parametreController.updateCategories);

router.get('/marques', parametreController.marques);
router.post('/marques', requireRole(['admin']), parametreController.addMarques);
router.put('/marques', requireRole(['admin']), parametreController.updateMarques);

module.exports = router;
