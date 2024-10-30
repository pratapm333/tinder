const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require("../models/user");

authRouter.post("/signup", async(req, res)=>{
    
    try{ 
        validateSignUpData(req);
        const {firstName, lastName, emailId, password} = req.body;

        //encrypt password
        const passwordHash = await bcrypt.hash(password, 10);
         
        const user = new User({firstName, lastName, emailId, password: passwordHash});
        await user.save();    
        res.send("User created sucessfully");
    } catch(err){
        res.status(400).send("Error: "+ err.message);
     }   
   
})
 
authRouter.post("/login", async(req, res) =>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});

        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
            const token = await user.getJWT();
            console.log("token", token);


            res.cookie("token", token, {expires: new Date(Date.now() + 8 * 3600000), httpOnly: true});
            res.send("Login Sucessful!!!");
        }
        else{
            throw new Error("Invalid credentials");
        }
        
    }catch(err){
            res.status(400).send("Error :" +err.message);
    }
})

module.exports = authRouter;