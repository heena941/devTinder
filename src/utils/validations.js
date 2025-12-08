const validator = require("validator");

const validateSignupData = (req) => {
    const {firstName, lastName, emailId, password } = req.body;

    if(!firstName || !lastName) {
        throw new Error("name is not empty");
    } else if(!validator.isEmail(emailId)) {
        throw new Error("Email Address not Valid");
       
    } else if(!validator.isStrongPassword(password)) {
         throw new Error("Password not a strong password");
    }
}

module.exports = { validateSignupData };