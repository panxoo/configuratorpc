const express = require('express');
const router = express.Router();
const parametreController = require('../controllers/parametreController');

router.get('/categories', parametreController.categories);
router.post('/categories', parametreController.addCategories);
router.put('/categories', parametreController.updateCategories);

router.get('/marques', parametreController.marques);
router.post('/marques', parametreController.addMarques);
router.put('/marques', parametreController.updateMarques);

module.exports = router;