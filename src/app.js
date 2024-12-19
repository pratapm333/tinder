const express = require("express");
const connectDB = require("./config/database");
const cors = require('cors');
const app = express();  
const cookieParser = require("cookie-parser");
 


const corsOptions = {
  origin: 'http://localhost:5173', // Explicitly allow your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Include PATCH here
  allowedHeaders: ['Content-Type', 'Authorization'], // Include necessary headers
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
// Handle preflight requests explicitly for all routes
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});


app.use(express.json());
app.use(cookieParser());  

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user"); 
 
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);
 
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
 
