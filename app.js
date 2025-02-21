const express=require ('express');
const path=require('path');
const mongoose=require('mongoose');
var methodOverride = require('method-override')
const Place =require("./model/place.js");
const Festival =require("./model/festival.js");
const Dist =require("./model/dists.js");
const User =require("./model/user.js");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js")
const wrapAsync=require("./utils/wrapAsync.js")
const userRoute=require("./router/user.js")
const {handelUserSignup}=require("./controlers/user.js")
const {v4:uuidv4}=require('uuid');
const {setUser , getUser}=require("./service/auth.js");
const cookieParser=require("cookie-parser")
const {restrictToLoggedinUserOnly , checkAuth}=require("./middleware/auth.js")
const forgotPasswordRoutes = require("./router/forgatePassword.js");
const resetPassword = require("./router/resetpass");
const bcrypt = require('bcrypt');
const cors = require("cors");
const upload = require("./middleware/upload");
const nodemailer=require("nodemailer");
const bodyParser=require("body-parser");
let app=express(); 

const router=express.Router(); 



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine("ejs",ejsMate); 
app.use(express.static(path.join(__dirname,"/public")));
app.use(cookieParser());
app.use(forgotPasswordRoutes);
app.use(resetPassword);
app.use(cors());    
app.use("/uploads", express.static("uploads"));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Databases mysticplace  
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/mysticplace');
     
  }
  main().then(res=>{console.log("connection to db")}).catch(err => console.log(err));

  //=====================================CLIENT SIDE PAGES===============home page=======================================

//add profile picture

app.post("/upload-profile", upload.single("profilePicture"), async (req, res) => {
    console.log("File received:", req.file);  // 🔹 Check if file is received
    console.log("Request body:", req.body); 
    // console.log(id)
  // 🔹 Check userId
    
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded!" });
    }

    try {
        const { userId } = req.body;
        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid user ID!" });
        }

        const imageUrl = `/uploads/${req.file.filename}`;
        const updatedUser=await User.findByIdAndUpdate(userId, { profilePicture: imageUrl },{new : true});

        res.json({ message: "Profile picture updated!", imageUrl });

        
    } catch (error) {
        console.error("Error saving profile picture:", error);
        res.status(500).json({ error: error.message });
    }
});


//signUp
  app.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
    const user= await User.findOne({email});
    
    const hashedPassword = await bcrypt.hash(password, 10);
            // user.password = hashedPassword;

           if(!user){
            await User.create({
                name,
                email,
                password:hashedPassword,
            }); 
          
            res.redirect("/mysticodisha/Signup&SignIn")
           }else{
            res.send("This email is already registered. Try to signIn");
           }
   

})

const sessionId=uuidv4(); //session id

app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        // Check if user exists
        if (!user) {
            return res.send("Invalid Email or Password");
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            setUser(sessionId, user);
            res.cookie("uid", sessionId);
            return res.redirect("/");
        } else {
            return res.send("Invalid Email or Password");
        }
    } catch (e) {
        console.log(e);
        return res.status(500).send("Internal Server Error");
    }
});


// user page
app.get("/mysticodisha/user",restrictToLoggedinUserOnly, async(req,res,next)=>{
 
  

    let user2=await getUser(sessionId);
    // console.log(user2)
    let userId=user2._id;
    const wishlists = await User.findById(userId).populate("wishlist");
    

    res.render("./clientSide/user.ejs",{user2,wishlists}) 
});

//delete wishlist
app.delete("/mysticodisha/user/:userid/:id",async(req,res,next)=>{
    console.log("ok")
    try{
    const {userid,id}=req.params;
    console.log(`Deleting wishlist ID: ${id} from user: ${userid}`);

    // Convert id to ObjectId
    const objectId = new mongoose.Types.ObjectId(id);

    // Update user document to remove the wishlist ObjectId
    const updatedUser = await User.findByIdAndUpdate(
        userid,
        { $pull: { wishlist: objectId } }, // Remove matching ObjectId
        { new: true } // Return the updated document
    );

    if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
    }

res.redirect("/mysticodisha/user")
}catch(e){

}

});


//=========================================
app.get("/mysticodisha/like/:id",restrictToLoggedinUserOnly ,async(req,res,next)=>{
    const {id}=req.params; //placeid
    // let place=await Place.findById(id);

   let user= getUser(sessionId);
   let userId=user._id; //userid

   await User.findByIdAndUpdate(
    userId,
    { $addToSet: { wishlist: id } }, // Adds only if it's not already in the array
    { new: true } // Returns the updated document
);

    res.redirect("/mysticodisha/user")
})


  app.get("https://sachin-nayak02.github.io/MysticOdisha/",async(req,res,next)=>{

    let dists=["Bargarh", "Balangir", "Sonepur", "Jharsuguda", "Sambalpur", "Deogarh", "Nuapada", "Kalahandi", "Mayurbhanj", "Keonjhar", "Sundargarh", "Dhenkanal", "Angul", "Boudh","Balasore","Bhadrak", "Jagatsinghpur","Jajpur","Kendrapara","Khordha","Puri","Cuttack","Nayagarh","Ganjam","Gajapati","Kandhamal","Rayagada","Koraput","Nabarangpur","Malkangiri"];
    let index=Math.floor(Math.random()*30)+1
    let places=await Place.find({dist:dists[index]});
    
    res.render("./clientSide/home.ejs",{places})

    // console.log(index2)
  })

  //  Search Recommendation
  app.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json([]);

    try {
        const results = await Place.find({ name: { $regex: '^' + query, $options: 'i' } }).limit(5);
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/submit', async (req, res) => {
    const placeName = req.body.placeName.trim();
    try {
        const distPlaces = await Place.findOne({ name: new RegExp(placeName, 'i') });
        if (distPlaces) {
            res.render('./clientSide/placePage.ejs', { distPlaces });
        } else {
            res.status(404).send('Place not found');
        }
    } catch (error) {
        res.status(500).send('Server Error');
    }

});

//user login
app.get("/mysticodisha/Signup&SignIn",(req,res,next)=>{
    res.render("./clientSide/login.ejs") 
})






// Forgot Password
app.get("/mysticodisha/forgot",(req,res,next)=>{
    res.render("./clientSide/ForgotPass.ejs")
 });



  //===================================================destination page====================================================
  app.get("/mysticodisha/destination",(req,res,next)=>{
    res.render("./clientSide/destination.ejs")
   
  })
  //=========================================DESTINATION DIST PAGE==============================================
  app.get("/mysticodisha/destination/:dist",wrapAsync(async(req,res,next)=>{

    let {dist}=req.params;
    let places=await Place.find({dist:dist})
    let distName=await Dist.findOne({name:dist})
    res.render("./clientSide/destination_dist.ejs",{distName,places})

  }));
  //=========================================DESTINATION DIST THEN PLACE PAGE========================================
  app.get("/mysticodisha/destination/:dist/:distPlace",async(req,res,next)=>{

    let {dist,distPlace}=req.params;
    let distPlaces=await Place.findOne({name:distPlace})
    res.render("./clientSide/placePage.ejs",{distPlaces});

  });
  
  //===========================================FESTIVAL NAVBAR ====================================================
  app.get("/mysticodisha/festival",async(req,res,next)=>{

    let festivals=await Festival.find({season:"Summer"});
    let festivalsRainy=await Festival.find({season:"Monsoon"});
    let festivalsWinter=await Festival.find({season:"Winter"});
    let festivalsAutumn=await Festival.find({season:"Autumn"});
    res.render("./clientSide/festival.ejs",{festivals,festivalsRainy,festivalsWinter,festivalsAutumn});
  })
  
  //=========================================== ABOUT ODISHA ====================================================
  app.get("/mysticodisha/aboutodisha",(req,res,next)=>{
    res.render("./clientSide/aboutOdisha.ejs");
  })

  //=========================================== Attraction ====================================================
  app.get("/mysticodisha/attraction",(req,res,next)=>{
    res.render("./clientSide/attraction.ejs");
  })

  //================================= Frequenty Ask Question====================================================
  app.get("/mysticodisha/Faq",(req,res,next)=>{
    res.render("./clientSide/Faq.ejs");
  })

  //=========================================== Contact Us ====================================================
  app.get("/mysticodisha/ContactUs",(req,res,next)=>{
    res.render("./clientSide/contact.ejs");

  })
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service (e.g., 'gmail', 'outlook')
    auth: {
        user: 'odishamystic@gmail.com', // Replace with your email
        pass: 'nxdj upyc obrt jexm'  // Replace with your email password or app password
    }
});

  // Route to handle form submission
app.post('/mysticodisha/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Define mailOptions inside the route handler
    const mailOptions = {
        from: 'odishamystic@gmail.com', // Sender address
        to: 'odishamystic@gmail.com', // Receiver address
        subject: `New Message from ${name}`, // Email subject
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}` // Email body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            console.error('Error details:', error.response); // Log detailed error response
            return res.status(500).json({ success: false, message: 'Failed to send message' });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    });
}); 
  //=========================================== About Us ====================================================
  app.get("/mysticodisha/AboutUs",(req,res,next)=>{
    res.render("./clientSide/aboutus.ejs");
  })
  //=========================================== Feedback ====================================================
  app.get("/mysticodisha/Feedback",(req,res,next)=>{
    res.render("./clientSide/feedback.ejs");
  })

//============================================logout========================================================
app.get("/logout", (req, res) => {
    res.clearCookie("uid"); // Clear the authentication cookie
    res.redirect("/");
});

































































  //===================================================backend for adding places========================================
  //===================================================backend for adding places========================================
  //===================================================backend for adding places========================================
  //===================================================backend for adding places========================================
app.get("/BackendAddPlace",wrapAsync(async(req,res,next)=>{
    let {dist}=req.query;
    if(dist){
        let results=await Place.find({dist:dist});
        return res.render("index.ejs",{results})
    }
    let results=await Place.find({});
    res.render("index.ejs",{results})
}));

// app.get("/BackendAddPlace/footer",(req,res,next)=>{
//     // res.render("./clientSide/destination.ejs");
// res.render("./layout/boilerplate.ejs")
// })
 

app.get("/addDb",(req,res,next)=>{ 
    res.render("placeDb.ejs")
})
app.post("/mysticOdisha",wrapAsync(async(req,res,next)=>{
    let{name,description,image,imagebn,dist,type,location,bio}=req.body;
    let s1=new Place({
        name:name,
        description:description,
        image:image,
        imagebn:imagebn,
        dist:dist,
        type:type,
        location:location, 
        bio:bio,
    })
   await s1.save()
    res.redirect("/addDb") 
}))

//update
app.get("/place/:id/edit",async(req,res,next)=>{
    let {id}=req.params;
    let result=await Place.findById(id);
    res.render("editDb.ejs",{result})
})
app.put("/mysticOdisha/:id",async(req,res,next)=>{
    let {id}=req.params;
    let {name,description,image,imagebn,dist,type,location,bio}=req.body;
    await Place.findByIdAndUpdate(id,{name:name})
    await Place.findByIdAndUpdate(id,{description:description})
    await Place.findByIdAndUpdate(id,{image:image})
    await Place.findByIdAndUpdate(id,{imagebn:imagebn})
    await Place.findByIdAndUpdate(id,{dist:dist})
    await Place.findByIdAndUpdate(id,{type:type})
    await Place.findByIdAndUpdate(id,{location:location})
    await Place.findByIdAndUpdate(id,{bio:bio})

    console.log("success");
    res.redirect("/BackendAddPlace")
  
})

//Delete
app.delete("/place/:id",async(req,res,next)=>{
    let {id}=req.params;
    await Place.findByIdAndDelete(id)
    res.redirect("/BackendAddPlace") 
})
//==================================festival DataBase Backend================================
app.get("/BackendAddFestival",wrapAsync(async(req,res,next)=>{
    let {season}=req.query;
    if(season){
        let festivals=await Festival.find({season:season})
       return res.render("indexFestival.ejs",{festivals});
      
    }

    let festivals=await Festival.find({})
    res.render("indexFestival.ejs",{festivals});
})); 

app.get("/addFestival",(req,res,next)=>{
    res.render("addFestival.ejs")
})
app.post("/BackendAddFestival",wrapAsync(async(req,res,next)=>{

    let {name,season,image,bio}=req.body;
    let f1=new Festival({
        season:season,
        name:name,
        image:image,
        bio:bio,
    })
    let result=await f1.save();
    console.log(result);
    res.redirect("/addFestival")
}))

app.get("/festival/:id/edit",async(req,res,next)=>{
    let {id}=req.params;
    let result=await Festival.findById(id);
    res.render("editFestival.ejs",{result})
    
})
app.put("/festival/:id",async(req,res,next)=>{
    let {id}=req.params;

    let {name,season,image,bio}=req.body;
    await Festival.findByIdAndUpdate(id,{name:name})
    await Festival.findByIdAndUpdate(id,{season:season})
    await Festival.findByIdAndUpdate(id,{image:image})
    await Festival.findByIdAndUpdate(id,{bio:bio})

    res.redirect("/BackendAddFestival");
})
app.delete("/festival/:id",wrapAsync(async(req,res,next)=>{
    let {id}=req.params;

    let result=await Festival.findByIdAndDelete(id);
    console.log(result)
    res.redirect("/BackendAddFestival");
}))

//=================================DIST DATABASE======================================
app.get("/BackendAddDist",async(req,res,next)=>{
    let {name}=req.query;
    if(name){
        let dists=await Dist.find({name:name})
       return res.render("indexDist.ejs",{dists});
      
    }
    let dists=await Dist.find({})
    res.render("indexDist.ejs",{dists});
})
app.get("/adddist",(req,res,next)=>{
    res.render("addDist.ejs")
})
app.post("/BackendAddDist",wrapAsync(async(req,res,next)=>{
    let {name,description,image,bio,bio2,location}=req.body;
    let d1=new Dist({
        name:name,
        description:description,
        image:image,
        bio:bio,
        bio2:bio2,
        location:location,
    })
    let result=await d1.save();
    console.log(result);
    res.redirect("/adddist")
}))

app.get("/dist/:id/edit",async(req,res,next)=>{
    let {id}=req.params;
    let result=await Dist.findById(id);
    res.render("editDist.ejs",{result})
    
})

app.put("/dist/:id",async(req,res,next)=>{
    let {id}=req.params;

    let {name,description,image,bio,bio2,location}=req.body;
    await Dist.findByIdAndUpdate(id,{name:name})
    await Dist.findByIdAndUpdate(id,{description:description})
    await Dist.findByIdAndUpdate(id,{image:image})
    await Dist.findByIdAndUpdate(id,{bio:bio})
    await Dist.findByIdAndUpdate(id,{bio2:bio2})
    await Dist.findByIdAndUpdate(id,{location:location})

    res.redirect("/BackendAddDist");
})

app.delete("/dist/:id",wrapAsync(async(req,res,next)=>{
    let {id}=req.params;

    let result=await Dist.findByIdAndDelete(id);
    console.log(result)
    res.redirect("/BackendAddDist");
}))

//=================================middleware==========================
app.get('*',(req,res,next)=>{
    next( new ExpressError(401,"Sorry,Page Not Found"));
})
app.use((err,req,res,next)=>{
      let {status=500,message="client side error"}=err;
      res.status(status).render("error.ejs",{message})
})
const PORT = process.env.PORT || 3030;
app.listen(PORT,()=>{
    console.log(`app listing on port ${PORT}`);
})  
