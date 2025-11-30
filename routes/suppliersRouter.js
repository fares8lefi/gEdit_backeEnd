var express = require('express');
var router = express.Router();

const suppliersController=require('../Controllers/suppliersController')
const {requireAuthUser}= require("../middlewares/authMiddelwares");


router.post('/addSuppliers',suppliersController.addSuppliers)
router.delete('/deleteSuppliers/:id',suppliersController.deleteSuppliers)
router.put('/updateSuppliers/:id',suppliersController.updateSuppliers)
router.get('/getActiveSuppliers',suppliersController.getActiveSuppliers)
router.patch('/updateSuppliersStatus/:id',suppliersController.updateSuppliersStatus)
router.get('/serachSuppliersbyName',suppliersController.serachSuppliersbyName)
module.exports = router;