var express = require('express');
var router = express.Router();

const userController=require('../Controllers/userController')
const {requireAuthUser}= require("../middlewares/authMiddelwares");

const {isAdmin}= require("../middlewares/isAdminMiddelware");
/* GET users listing. */
router.post('/createUser',userController.createUser)
router.post('/loginUser',userController.loginUser)
router.get('/getConnectedUser',requireAuthUser,userController.getConnectedUser)
router.post('/lougOutUser',requireAuthUser,userController.lougOutUser)
router.post('/changePassword',requireAuthUser,userController.changePassword)
router.put('/updatePersonnelData',requireAuthUser,userController.updatePersonnelData)
router.put('/updateUserStatus',requireAuthUser,userController.updateUserStatus)
router.get('/getUsersList',requireAuthUser,isAdmin,userController.getUsersList)
module.exports = router;
