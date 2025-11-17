const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")

const requireAuthUser = (req, res, next) => {
   const token = req.cookies.jwt_login;
   
  
 console.log("token récu avec succée: ", token); 
  if (token) {
    jwt.verify(token, process.env.net_Secret, async (err, decodedToken) => {
      if (err) {
        console.log("il ya une erreur au niveau du token", err.message);
        if (req.session) {
          req.session.user = null; // session null
        } else {
          req.user = null;
        }
        return res.json("/Problem_token");
      } else {
        const foundUser = await userModel.findById(decodedToken.id);
        if (req.session) {
          req.session.user = foundUser; // session get user
        } else {
          
          req.user = foundUser;
          console.warn('Warning: req.session is undefined — user stored on req.user instead');
        }
        return next();
      }
    });
  } else {
    if (req.session) {
      req.session.user = null; // session null
    } else {
      req.user = null;
    }
    return res.json("/pas_de_token");
  }
};
module.exports = { requireAuthUser };