const express = require("express");
const connectDB = require("./config/database")
const User = require("./models/user");
const user = require("./models/user");
const app = express();

app.use(express.json());

app.get("/user", async (req,res)=>{
    const userId = req.body._id;
   
  try{ 
    const users = await User.findById(userId);
    res.send(users)} 
  
  catch(err){
    res.status(400).send("something went wrong")
  }
  
})

app.patch("/user", async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body;
try{
    await User.findByIdAndUpdate({_id:userId},data);
    res.send("Updated sucessful")
}
catch(err){
    res.status(400).send("something went wrong")
  }
 
})

app.delete("/user", async(req,res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("user Deleted Sucessfull")
    }
    catch(err){
        res.status(400).send("UNABLE TO DELETE")
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



 