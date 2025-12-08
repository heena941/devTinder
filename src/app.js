const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validations");
const bcrypt = require("bcrypt");

app.use(express.json()); // read the json data object to js object

// save the user data into database
app.post("/signup", async (req, res) => {
    try {
        // validate the data
        validateSignupData(req);

        const { firstName, lastName, emailId, password } = req.body;
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // create a new instance of user
        const user = new User({
            firstName,
            lastName,
            emailId,
            password : passwordHash
        });

        await user.save();
        res.send("data save successfully");
    } catch(err) {
        res.status(401).send("Error saving the user - " + err.message);
    }
});

//login
app.post("/login", async (req,res) => {
    try{
        const {emailId, password} = req.body;

        const user = await User.findOne({emailId : emailId});
        if(!user) {
            throw new Error("Invalid Creditionals");
        } 

        const isValidPassword = await bcrypt.compare(password,user.password);
        if(isValidPassword) {
            res.send("Login Successful!!");
        } else {
            throw new Error("Invalid Creditionals");
        }
    } catch(err) {
        res.status(404).send("ERROR! " + err.message);
    }
    
});

// get the user details by emailId
app.get("/user" , async (req,res) => {
    const userEmail = req.body.emailId;
    
    try {
        const users = await User.find({ emailId : userEmail });
        if(users.length === 0) {
            res.status(404).send("user not found");
        } else {
            res.send(users);
        }
    } catch(err) {
        res.status(404).send("something went wrong");
    }
});


// get the details of all users
app.get("/feed" , async (req, res) => {   
    try {
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(404).send("user not found");
    }
});

// delete a user by id
app.delete("/deleteUser", async (req, res) => {
    const userId = req.body.userId;
    try {       
        await User.findByIdAndDelete(userId);
        res.send("deleted user!!");
    } catch(err) {
        res.status(404).send("user not found");
    }
});

//update data of the user
app.patch("/updateUserData/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
        const ALLOWED_UPDATES = ['photoUrl', 'age', 'skills','about'];
        const isUPDATEALLOWED = Object.keys(data).every((k) => 
            ALLOWED_UPDATES.includes(k)
        );
        if(!isUPDATEALLOWED) {
            throw new Error("UPDATE NOT ALLOWED!!!!");
        }

        if(data?.skills.length > 10) {
            throw new Error("skills must be 10");
        }

        await User.findByIdAndUpdate({ _id : userId}, data, {runValidators : true});
        res.send("update data successfully");
    } catch(err) {
        res.status(404).send("UPDATE FAILED - " + err.message);
    }
});


connectDB().then(() => {
    console.log("database connect succesfully")
    app.listen(8888, () => {
    console.log("Connect the port 8888!")   
    }); // listen the port
}).catch((err) => {
    console.log("connect not established");
});

