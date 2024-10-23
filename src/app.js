const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

app.post("/signup", async(req, res)=>{
    const userObj = {
        firstName: "Uma",
        lastName: "Pratap",
        emailId: "uma@gmail.com",
        password:"uma123",
        gender: "Female"
    }

    try{ 
        const user = new User(userObj);
        await user.save();    
        res.send("User created sucessfully");
    } catch(err){
        res.status(400).send("Error saving the user"+ err.message);
     }   
   
})
 
connectDB()
.then(() =>{
    console.log("DB Connection is established")
    app.listen(3000, () =>{
        console.log("Server is successfully listen")
    });
})
.catch((err)=>{
    console.log("DB can't established")
})



 