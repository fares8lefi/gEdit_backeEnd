const userModel = require('../models/userModel');

module.exports.createUser =async(req,res) =>{
    try{
            const {username,password,phone,email}=req.body;
            if(!username){
                return res.status(400).json({error:"Username is required"});
            }
             if(!password){
                return res.status(400).json({error:"password is required"});
            }
             if(!phone){
                return res.status(400).json({error:"phone is required"});
            }
            if(!email){
                return res.status(400).json({error:"email is required"});
            }
            await userModel.create(
                {
                    username,
                    email,
                    password,
                    phone,
                }
            )
         res.status(200).json({message :"user add successflly"})   
    }catch(err){
        console.log(err);
        res.status(500).json({error:err.message})
    }
}