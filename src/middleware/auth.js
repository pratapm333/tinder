const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try{
        const {token} = req.cookies;
        if(!token) {
            return res.status(401).send("Please Login!") 
        }
        const decodedObj = await jwt.verify(token, "LOVE@Tinder$143");
        const {_id} = decodedObj;
        const user = await User.findById(_id);
        if(!user){
            throw new Error("User is not fount");
        }
        req.user = user;
        next()
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
}

module.exports = {
    userAuth,
}