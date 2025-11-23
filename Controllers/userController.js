const UserModel = require('moongose/models/user_model');
const userModel = require('../models/userModel');
const jwt =require('jsonwebtoken');
const bcrypt =require('bcrypt');
maxTime=240*60 *60
const createToken = (id) => {
    
    const expiresIn =maxTime;
    return jwt.sign({ id }, process.env.net_Secret, { expiresIn });
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
            maxAge: maxTime,
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
      token, 
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}


module.exports.getConnectedUser = async (req, res) => {
    try {
       
        const id = req.session.user?._id;
        
        if (!id) {
            return res.status(404).json({ message: "user not found" });
        }
        
        const user = await userModel.findById(id);
        
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        
        res.status(200).json({ user });
    } catch (error) {
        
        res.status(500).json({ message: error.message });
    }
}

module.exports.lougOutUser = async (req,res)=>{
    try{
         res.cookie("jwt_login", "", {
         maxAge: 1,
        httpOnly: true,
    });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports.changePassword = async (req,res)=>{
    try{
        const {currentPassord, newPassword} = req.body;
        const id = req.session.user?._id;
        console.log(id)
        const change= await userModel.verifPasswordUser(id,currentPassord)
        console.log(change)
        if (change){
          const salt = bcrypt.genSalt();
          console.log("================",newPassword)
          const hashedPassword= bcrypt.hash(newPassword, salt)
          const update = await userModel.findByIdAndDelete(id,{
            password:hashedPassword
          })
          return res.status(200).json({
            success: true,
            message: "Password updated successfully"
            });
        }
       
    }catch(error){
        
        res.status(500).json({ message: error.message });
    }
}

module.exports.updatePersonnelData = async function(req ,res){
    try{
        const {username , email, phone , password}= req.body
    
        const id = req.session?.user?._id || req.user?._id;

        if (!id) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        const match = await userModel.verifPasswordUser(id, password);
        if (match) {
            
            const updates = {};
            if (username) updates.username = username;
            if (email) updates.email = email;
            if (phone) updates.phone = phone;

            if (Object.keys(updates).length > 0) {
                await userModel.findByIdAndUpdate(id, updates, { new: true });
            }

            return res.status(200).json({ message: 'success' });
        }

        return res.status(401).json({ message: 'Current password incorrect' });
    }catch(error){
        res.status(500).send({ message: error.message });
    }
}

module.exports.updateUserStatus= async function (req , res){
    try{

        const id = req.session?.user?._id || req.user?._id;
        const user=await userModel.findById(id);
        if(!user){
            res.status(500).json({success: false,message:"user not found"})
        }
      await userModel.findByIdAndUpdate(
    id,
    { is_active: true },
    { new: true } 
);
        res.status(200).json({success: true,message:"user updated"})
    }catch(error){
        console.log("error",error)
        res.status(500).json({ message: error.message });
    }

}