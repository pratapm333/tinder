const express = require("express");
const connectDB = require("./config/database")
const app = express(); 
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// app.get("/user", async (req,res)=>{
//     const userId = req.body._id;
   
//   try{ 
//     const users = await User.findById(userId);
//     res.send(users)} 
  
//   catch(err){
//     res.status(400).send("something went wrong")
//   }
  
// })

// app.patch("/user/:userId", async (req,res)=>{
//     const userId = req.params?.userId;
//     const data = req.body;

// try{
//     const ALLOWED_UPDATES = ["photoUrl", "about", "gender","age", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k)=>
//     ALLOWED_UPDATES.includes(k));
//     if(!isUpdateAllowed){
//         throw new Error("Update is not allowed");
//     }
//     if(data?.skills.length >10){
//         throw new Error("Not more than 10");
//     }

//     await User.findByIdAndUpdate({_id:userId},data, {
//         returnDocument: "after", 
//         runValidators: true
//     });
//     res.send("Updated sucessful")
// }
// catch(err){
//     res.status(400).send("something went wrong")
//   }
 
// })

// app.delete("/user", async(req,res) =>{
//     const userId = req.body.userId;
//     try{
//         const user = await User.findByIdAndDelete(userId);
//         res.send("user Deleted Sucessfull")
//     }
//     catch(err){
//         res.status(400).send("UNABLE TO DELETE")
//     }
// })

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
