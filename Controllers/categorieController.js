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

module.exports.getAllCategories = async function(req,res){
    try{
        const categories = await  categorieModel.find();
        res.status(200).json({categories });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports.updateCategorie = async function(req,res){
    try{
        const {id ,name ,code , description} = req.body
        const categories = await categorieModel.findById(id)
        if (!id){
            res.status(400).json({message :"id non valid"});
        }
        const update = await  categorieModel.findByIdAndDelete(id,{
                name :name,
                code :code
        })
        
        
        res.status(200).json({ message :"code et nom valide "});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}


