const express = require("express");

const app = express();

app.use("/home",(req,res) => { // request handler
    res.send("home");
});

app.use("/test",(req,res) => {
    res.send("test page");
});

app.listen(8888); // listen the port