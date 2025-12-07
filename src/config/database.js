const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://heena0941_db_user:GpYPTAU7DfDfgysI@namestenode.ijrhiwk.mongodb.net/devTinder");
};

module.exports =  connectDB