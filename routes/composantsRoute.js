const express = require('express');
const router = express.Router();
const composantsController = require('../controllers/composantsController');

router.get('/', composantsController.composants);
router.get('/:id', composantsController.composant);
router.post('/', composantsController.register);
router.put('/', composantsController.update);
router.delete('/:id', composantsController.delete);

module.exports = router;