import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/usersDB")

const userSchema = mongoose.Schema({
    name :{
        type : String,
        required : true,
        minLength : 3
    },
    age : {
        type :String,
        min:18,
        required:true
    }
})

mongoose.model("User" , userSchema) 

console.log("DB connected")