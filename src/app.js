const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user")
const app = express();

app.use(express.json());

app.get("/user", async (req,res)=>{
    const userEmail = req.body.emailId;
   
  try{ 
    const users = await User.find({emailId:userEmail})
    if(users.length === 0){
        res.status(400).send("User not found");
    }else{
        res.send(users)} 
    }
  
  catch{(err) =>{
    res.status(400).send("something went wrong")
  }
  }
})

app.post("/signup", async(req, res)=>{
    // const userObj = {
    //     firstName: "Uma",
    //     lastName: "Pratap",
    //     emailId: "uma@gmail.com",
    //     password:"uma123",
    //     gender: "Female"
    // }

    try{ 
        const user = new User(req.body);
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



 