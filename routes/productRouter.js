var express = require('express');
var router = express.Router();
const productController =require('../Controllers/productController')


router.post('/addProduct',productController.addProduct)

module.exports = router;