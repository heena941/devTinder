const express = require("express");
const userRouter = express.Router();
const { userAuth} = require ("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_DATA = "firstName lastName";

userRouter.get("/user/request/received", userAuth, async (req,res) => {
    try {
        const userId = req.user._id;
        const connectRequest = await ConnectionRequest.find({
            toUserId : userId,
            status : "interested"
        }).populate("fromUserId", USER_DATA);

        res.json({
            message : `Connection Requests received for user ${req.user.firstName}`,
            data : connectRequest
        });

    } catch (err) {
        res.status(400).send("ERROR = " + err.message);
    }
});

userRouter.get("/user/connection", userAuth, async (req,res) => {
    try {
        const userId = req.user._id;
        
        const connectRequest = await ConnectionRequest.find({
            $or : [
                { toUserId : userId, status : "accepted"},
                { fromUserId : userId, status : "accepted"}
            ],
           
        }).populate("fromUserId", USER_DATA);

        res.json({
            data : connectRequest
        });

    } catch (err) {
        res.status(400).send("ERROR = " + err.message);
    }
});

module.exports = userRouter;