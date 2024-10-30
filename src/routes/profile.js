const express = require("express");
const profileRouter = express.Router(); 
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile", userAuth, async (req,res) => {

    try{
        // const cookies = req.cookies;
        // const {token} = cookies;
        // if(!token){
        //     throw new Error("Invalid token");
        // }

        // validate my token
        // const decodedMessage = await jwt.verify(token, "LOVE@Tinder$143")
        // console.log(decodedMessage);
        // const {_id} = decodedMessage;
        // console.log("LoggedIn user" + _id);
        // const user = await User.findById(_id);
        // if(!user){
        //     throw new Error("User doesn't exist")
        // }
        const user = req.user; 
      
        res.send(user);
    }catch(err){
        res.status(400).send("Error: " + err.message)
    }
    
})

module.exports = profileRouter;