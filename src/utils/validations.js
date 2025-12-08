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

const isValidateUpdateProfile = (req) => {
    
        const updatableFields = ["firstName", "lastName", "emailId", "skills", "about" ,"profileUrl"];

        const isUpdatingField = Object.keys(req.body).every((field) => updatableFields.includes(field));

        return isUpdatingField;
};
const isValidatePassword = (req) => {
    const {password} = req.body;

    const allowedPasswordFields = ["password"];
    const isUpdatingPasswordField = Object.keys(req.body).every((field) => allowedPasswordFields.includes(field));

    if(!isUpdatingPasswordField) {
        throw new Error("Invalid Password Update Request");
    }

    if(!validator.isStrongPassword(password)) {
        throw new Error("Password not a strong password");
    }

    return true;
}
module.exports = { validateSignupData , isValidateUpdateProfile, isValidatePassword};