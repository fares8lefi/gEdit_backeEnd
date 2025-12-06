const categorieModel = require('../models/categorieModel')

module.exports.createcategory = async function(req,res){
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
        const update = await  categorieModel.findByIdAndUpdate(id,{
                name :name,
                code :code
        })
        
        
        res.status(200).json({ message :"code et nom valide "});
    }catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteCategorie = async function (req, res) {
    try {
        const id = req.params.id; 

        const categorie = await categorieModel.findById(id);

        if (!categorie) {
            return res.status(400).json({ message: "categorie not found" });
        }

        await categorieModel.findByIdAndDelete(id);

        res.status(200).json({ message: "categorie deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

