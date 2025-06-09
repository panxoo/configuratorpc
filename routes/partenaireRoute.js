const express = require('express');
const router = express.Router();
const partenairesController = require('../controllers/partenairesController');

router.get('/', partenairesController.getAll);
router.get('/:id', partenairesController.partenaire);
router.post('/', partenairesController.register);
router.put('/', partenairesController.update);
router.delete('/:id', partenairesController.delete);

module.exports = router;
