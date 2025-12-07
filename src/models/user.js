const mongoose = require("mongoose");

const userModel = mongoose.Schema({
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
});

module.exports = mongoose.model("User", userModel);