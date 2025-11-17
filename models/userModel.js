const e = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
    {
        username: {
            type : String,
            required : true,
            unique : true,
        },
        email:{
            type : String,
            required : true,
            match: [
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                "L'adresse e-mail doit être valide ex: exemple@domaine.com .",
            ],
        },
        password: {
            type : String,
            required : true,
            match: [
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        "Le mot de passe doit contenir au moins 8 caractères, inclure une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&).",
                    ],
        },
        role: {
            type : String,
            enum : ['user', 'admin'],
            default : 'user',
        },
        is_active: {
            type : Boolean,
            enum : ['true', 'false'],
            default : 'false',
        },
        phone: {
            type : String,
            required : false,
            unique : true,
        },
        created_at: {
            type : Date,
            default : Date.now,
        },
        last_login: {
            type : Date,
            default : null,
        },

    }
);

userSchema.pre("save", async function(next){
    try{
        const salt = await bcrypt.genSalt()
        const user =this ;
        user.password = await bcrypt.hash(user.password ,salt);
        next();
    }catch(err){
        next(err);
    }
})
userSchema.post("save", async function (res, req, next) {
  console.log("user add -------------------------------");
});


userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    } else {
      throw new Error("password invalid");
    }
  } else {
    throw new Error("email not found");
  }
};
const User = mongoose.model('User', userSchema);

module.exports = User;