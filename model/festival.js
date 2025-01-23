const { urlencoded } = require('express');
const mongoose=require('mongoose');
let Schema=mongoose.Schema;

const festivalSchema=new Schema({
    season:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    bio:{
        type:String,
        required:true,
    }
})

const Festival=mongoose.model("Festival",festivalSchema);
module.exports=Festival;