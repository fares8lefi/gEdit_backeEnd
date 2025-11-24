const categorieModel = require('../models/categorieModel')

module.exports.createCategorie = async function(req,res){
    try{
         const {name , code}= req.body;
        const existingCategory = await categorieModel.verifNameCode(code, name);
        if(existingCategory){
            res.status(400).json({success: false , message :"categorie existe" })
        }
        const categories = await categorieModel.create({name ,code})
        res.status(200).json({categories})
    }catch(error){
        console.log(error)
      res.status(500).json({ message: error.message });
    }
}



