var express = require('express');
var router = express.Router();
const categorieController =require('../Controllers/categorieController')


router.post('/createCategorie', categorieController.createcategory);
router.get('/getAllCategories', categorieController.getAllCategories);
router.put('/updateCategorie', categorieController.updateCategorie);
router.delete('/deleteCategorie/:id', categorieController.deleteCategorie);

module.exports = router;