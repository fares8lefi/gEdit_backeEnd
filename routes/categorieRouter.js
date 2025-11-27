var express = require('express');
var router = express.Router();
const categorieController =require('../Controllers/categorieController')

router.post('/createCategorie',categorieController.createCategorie)
router.get('/getAllCategories',categorieController.getAllCategories)
router.get('/updateCategorie',categorieController.updateCategorie)
module.exports = router;