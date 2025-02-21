const express=require('express');
const {handelUserSignup}=require("../controlers/user.js")

const router=express.Router();

router.post("/register",handelUserSignup)
module.exports=router;