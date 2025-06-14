const express = require('express');
const router = express.Router();
const prixCompController = require('../controllers/prixComposantController');
const requireRole = require('../middlewares/requireRoleMiddlewares');

router.get('/category_partenaire', requireRole(['admin']), prixCompController.prixCategoryPartenaire);

router.get('/category_prixlow', prixCompController.getPrixComposantLowerForCategory);
router.get('/composant_prix', prixCompController.prixComposant);

router.post('/', requireRole(['admin']), prixCompController.register);
router.put('/', requireRole(['admin']), prixCompController.update);
router.delete('/:id', requireRole(['admin']), prixCompController.delete);

module.exports = router;
