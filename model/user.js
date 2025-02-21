const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Place" // Reference to the "Place" collection
        }
    ],
    otp: { 
        type: String 
    }, // Stores OTP
    otpExpires: {
         type: Date
     },
     profilePicture: { 
        type: String,  // Store image URL (e.g., "/uploads/user123.jpg")
        set: (v) =>
            v === "  "
        ? "/uploads/deerDp.jpg"
        : v, 
        default: "/uploads/deerDp.jpg",
    },
},{timestamps: true});

const User=mongoose.model("User",userSchema);

module.exports=User;
