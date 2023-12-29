const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please add name"],
    },
    acno:{
        type: String,
        required: [true, "Please add name"],
    },
    amt:{
        type: Number,
        required: [true, "Please add name"],
    },
},{
    timestamps: true,
})
module.exports=mongoose.model("Account",accountSchema);