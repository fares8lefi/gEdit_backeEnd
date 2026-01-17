var express = require('express');
var router = express.Router();
const productController =require('../Controllers/productController')



router.post('/addProduct', productController.addProduct);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/getAllProduct', productController.getAllProduct);


module.exports = router;