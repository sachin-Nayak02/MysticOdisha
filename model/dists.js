const mongoose = require("mongoose");
let Schema = mongoose.Schema;

const distSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  bio2:{
    type:String,

  },
  location: {
    type: String,
    required: true,
  },
});

const Dist = mongoose.model("Dist", distSchema);
module.exports = Dist;
