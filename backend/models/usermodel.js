import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:[true,"username already exists"]
    },
    email:{
        type:String,
        required:true,
        unique:[true,"account with thisemail already exists"]
    },
    password:{
        type:String,
        required:true
    }
});

const User=mongoose.model("users",userSchema);

export default User;