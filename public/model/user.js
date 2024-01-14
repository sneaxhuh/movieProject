const mongoose = require("mongoose")
const userData = new mongoose.Schema({
    email:{
        type: String
    },
    pass:{
        type: Number
    }
})

const User = mongoose.model("User",userData)
module.exports = User