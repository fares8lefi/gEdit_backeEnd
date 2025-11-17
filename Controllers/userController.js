const userModel = require('../models/userModel');
const jwt =require('jsonwebtoken')

const maxTime=1000;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.net_Secret, { expiresIn: maxTime });
};

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

module.exports.loginUser=async(req, res)=>{
   try{ 
    const {email,password}=req.body;
    const user =await userModel.login(email,password);
    const token = createToken(user._id);
       res.cookie("jwt_login", token, {
      httpOnly: true,
      maxAge: maxTime * 1000,
    });
    
    await userModel.findByIdAndUpdate(user._id, { last_login: new Date() });
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      token, // Envoyer le token dans la réponse
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}
