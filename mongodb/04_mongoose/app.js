import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/usersDB")

// Application level validation
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

const User = mongoose.model("User" , userSchema) 


// CRUD operations
// Read
/* console.log(await User.find({name : "Akash"}))
 */
// Update 
await User.updateOne({name : "Akash"} , {$set : {age : 22}})