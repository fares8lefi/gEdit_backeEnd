var express = require('express');
var router = express.Router();

const userController=require('../Controllers/userController')
const {requireAuthUser}= require("../middlewares/authMiddelwares");
/* GET users listing. */
router.post('/createUser',userController.createUser)
router.post('/loginUser',userController.loginUser)
router.get('/getConnectedUser',requireAuthUser,userController.getConnecedtUser)
module.exports = router;
