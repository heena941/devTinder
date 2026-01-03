const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true 
    },
    status : {
        type : String,
        enum : {
            values : ["interested", "ignored", "accepted","rejected"],
            messages : `status can't be {VALUE}`
        }
    }
},
{
    timestamps : true
});

connectionRequestSchema.pre("save", function() {
    const connectionRequest = this;
    
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Invalid Operation - cannot send request to self");
    }

});

/**
 * Prevent duplicate requests
 */
connectionRequestSchema.index(
  { fromUserId: 1, toUserId: 1 },
  { unique: true }
);

const ConnectionRequestModel = new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports = ConnectionRequestModel; 