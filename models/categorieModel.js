const mongoose = require('mongoose')


const categorieSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,     
    },
     code :{
        type : Number,
        required : true,     
    },
     description :{
        type : String,   
    },
    is_active: {
        type: Boolean,
        default : true
    },
    created_at : {
        type : Date,
        default : Date.now,
    }

    })



const Categorie = mongoose.model('Categorie', categorieSchema);

module.exports = Categorie;