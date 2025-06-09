const express = require('express');
const router = express.Router();
const prixCompController = require('../controllers/prixComposantController');

router.get('/category_partenaire', prixCompController.prixCategoryPartenaire);
router.get('/category_user', prixCompController.getPrixCategoryPrixLower);
router.get('/composant_prix', prixCompController.prixComposant);
router.get('/', prixCompController.prixComposant);
router.post('/', prixCompController.register);
router.put('/', prixCompController.update);
router.delete('/:id', prixCompController.delete);

module.exports = router;
