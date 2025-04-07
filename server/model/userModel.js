import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : false
    },
    address:{
        type:Date,
        required : true
    }
})

export default mongoose.model("Users", userSchema);