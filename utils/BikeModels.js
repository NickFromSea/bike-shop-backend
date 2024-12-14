const mongoose = require("mongoose");

const motorcycleSchema = new mongoose.Schema({

 make: String,
 model:String,
 year: Number,
 price: Number,
 image:{
    type:String,
    required:true
 },
 sold: {
  type: Boolean,
  default: false,
 },
});

module.exports = mongoose.model("BikeModel", motorcycleSchema);


