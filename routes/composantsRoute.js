const express = require('express');
const router = express.Router();
const composantsController = require('../controllers/composantsController');
const upload = require('../middlewares/uploadFile');

router.get('/', composantsController.composants);
router.get('/:id', composantsController.composant);
router.post('/', upload.single('image'), composantsController.register);
router.put('/',upload.single('image'), composantsController.update);
router.delete('/:id', composantsController.delete);

module.exports = router;