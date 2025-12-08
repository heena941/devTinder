const jwt =  require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req,res,next) => {
    const token = req.cookies?.token;
    
    const decodeObj = jwt.verify(token, "DEV@TINDER");
    const {_id} = decodeObj;
    const user = await User.findById(_id);
    if(!user) {
       throw new Error("Unauthorized Access - User Not Found");
    } else {
        req.user = user;
        next();
    }
};

module.exports = {
    userAuth
}