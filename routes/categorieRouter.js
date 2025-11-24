var express = require('express');
var router = express.Router();
const categorieController =require('../Controllers/categorieController')

router.post('/createCategorie',categorieController.createCategorie)
module.exports = router;