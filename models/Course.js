let mongoose = require("mongoose");

let schema = new mongoose.Schema(
    {
        name:{type:String},
        description:{type:String, required:true}
    }
);

module.exports = mongoose.model("courses", schema);