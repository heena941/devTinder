const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require ("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//send connection request
requestRouter.post("/request/send/:status/:toUserId", 
    userAuth, 
    async (req,res) => {
    try {
        const {status, toUserId} = req.params;
        const fromUserId = req.user._id;

        const isUserId = await User.findById(toUserId);
        if(!isUserId) {
            throw new Error("Invalid User Id");
        }   

        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)) {
            throw new Error("Invalid Status - " + status);
        }

        const existingRequest = await ConnectionRequest.findOne({
            $or : [
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        });
        if(existingRequest) {
            throw new Error("Request already sent to this user");
        }

        // logic to send request
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })
        
        const data = await connectionRequest.save();
        res.json({
            message : `${fromUserId} is ${status} to ${toUserId}`,
            data : data
        });

    } catch (err) {
        res.status(400).send("Error in sending request - " + err.message);
    }     
});

module.exports = requestRouter;