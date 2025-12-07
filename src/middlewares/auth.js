const adminAuth = (req,res,next) => {
    const token = "xyz";
    const isAuthrized = token === "xyz";
    if(!isAuthrized) {
        res.status(401).send("unautorized request");
    } else {
        next();
    }
};

module.exports = {
    adminAuth
}