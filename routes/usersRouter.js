var express = require('express');
var router = express.Router();
const userController=require('../Controllers/userController')
/* GET users listing. */
router.post('/createUser',userController.createUser)
router.post('/loginUser',userController.loginUser)
module.exports = router;
