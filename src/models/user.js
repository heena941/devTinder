const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        minLength : 4
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("email address is not valid - " + value);
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
        validate(value) {
            if(!['male','female','others'].includes(value)) {
                throw new Error("data is not valid");
            }
        }
    },
    photoUrl : {
        type : String
    },
    about : {
        type : String,
        default : "This is the description"
    },
    skills : {
        type : [String]
    }

}
,
{
    timestamps : true
}
);

UserSchema.methods.getJwt = async function() {
    const user = this;
    const token = await jwt.sign({_id : user._id}, 
        "DEV@TINDER", 
        {expiresIn : "1d"}
    );
    return token;
}

UserSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;

    const isValidPassword = await bcrypt.compare(
        passwordInputByUser,
        user.password
    );
    return isValidPassword;
}
module.exports = mongoose.model("User", UserSchema);