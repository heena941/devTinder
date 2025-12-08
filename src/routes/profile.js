const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require ("../middlewares/auth");
const { isValidateUpdateProfile, isValidatePassword } = require("../utils/validations");
const bcrypt = require("bcrypt");

//get the user profile
profileRouter.get("/profile/view", userAuth, async (req,res) => {
    try {
        const user = req.user;
        console.log("user", user);
        res.send(user);

    } catch(err) {
        res.status(401).send("Unauthorized Access - " + err.message);
    }
});

//update the user profile
profileRouter.patch("/profile/edit", userAuth, async (req,res) => {
    try{
        if(!isValidateUpdateProfile(req)) {
            throw new Error("Invalid Update Profile Request");
        }

        const user = req.user;
        Object.keys(req.body).forEach((field) => {
            user[field] = req.body[field];
        });

        await user.save();
        //res.send("Profile Updated Successfully!!");

        res.json({
            message : `${user.firstName}, your profile updated successfully`,
            data : user
        })

    } catch(err) {
        res.status(400).send("Error updating the profile - " + err.message);
    }
});

//update the user password
profileRouter.patch("/profile/updatePassword", userAuth, async (req,res) => {
    try{
        if(!isValidatePassword(req)) {
            throw new Error(" Invalid Password Update Request");
        }

        const user = req.user;
        
        const {password} = req.body;
        user.password = await bcrypt.hash(password, 10);;

        await user.save();
        res.json({
            message : `${user.firstName}, your Password updated successfully`,
            data : user
        })

    } catch(err) {
        res.status(400).send("Error updating the profile - " + err.message);
    }
});

module.exports = profileRouter;