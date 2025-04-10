import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    mood:{
        type:String,
        required : true
    },
    comments:{
        type:String,
        required : false
    },
    date:{
        type:Date,
        required : true
    },
    email:{
        type:String,
        required:true
    }
})

export default mongoose.model("Users", userSchema);