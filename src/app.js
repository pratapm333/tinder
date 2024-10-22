const express = require("express");
const app = express();

 
app.get("/user", (req,res)=>{
    res.send({"first_name": "Pratap", "last_name": "MP"})
})

app.post("/user", async (req,res)=>{
   console.log(req.body)  
   //saving data in DB
    res.send("data is created in DB");
})

app.patch("/user", (req,res)=>{
    res.send("Updated successfully")
})
app.delete("/user", (req,res)=>{
    res.send("User deleted");
})

app.use("/hello", (req,res)=>{
    res.send("Hello hello hello")
});


app.listen(3000, () =>{
    console.log("Server is successfully listen")
});

app.use("/", (req,res)=>{
    res.send("Hi Hello")
});