const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json()); // read the json data object to js object
app.use(cookieParser()); // read the cookie from request

//import the routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

//use the routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

//connect to database and start the server
connectDB().then(() => {
    console.log("database connect succesfully")
    app.listen(8888, () => {
    console.log("Connect the port 8888!")   
    }); // listen the port
}).catch((err) => {
    console.log("connect not established");
});

