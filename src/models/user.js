const mongoose = require("mongoose");
var validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50

    },
    lastName: {type:String},
    emailId: {
        type:String,
        required: true,
        unique:true,
        lowercase: true,
        trim: true,
        validate(value){
           if(!validator.isEmail(value)){
            throw new Error("Email id is not valid")
           }            
        }

    },
    password: {
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter Strong Password:" + value)
            }
        } 
    },
    age:{
        type:Number,
        min: 18,
        max:60
    },
    gender: {
        type:String,
        validate(value) {
            if(!["male", "female","others"].includes(value)){
                throw new Error("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://www.ihna.edu.au/blog/wp-content/uploads/2022/10/user-dummy.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Photo url is not valid");
            }
        }
    },
    about: {
        type: String,
        default: "This is default value",
    },
    skills: {
        type: [String]
    },
},
{
    timestamps: true,
}
);

module.exports = mongoose.model("User",userSchema);