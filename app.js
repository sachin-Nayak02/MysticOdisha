const express=require ('express');
const path=require('path');
const mongoose=require('mongoose');
var methodOverride = require('method-override')
const Place =require("./model/place.js");
const Festival =require("./model/festival.js");
const ExpressError=require("./utils/ExpressError.js")
const wrapAsync=require("./utils/wrapAsync.js")
let app=express();

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,"/public")));
// app.engine("ejs",ejsMate);   

// Databases mysticplace  
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/mysticplace');
     
  }
  main().then(res=>{console.log("connection to db")}).catch(err => console.log(err));

  //home page
  app.get("/",(req,res,next)=>{
   
    res.render("./clientSide/home.ejs")
  })
  app.get("/foo",(req,res,next)=>{
    res.render("./layout/boilerplate.ejs")
  })
  
  //backend for adding places
app.get("/BackendAddPlace",wrapAsync(async(req,res,next)=>{
    let {dist}=req.query;
    if(dist){
        let results=await Place.find({dist:dist});
        return res.render("index.ejs",{results})
    }

    let results=await Place.find({});
    res.render("index.ejs",{results})

 
}) )
 

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

//-----------------------------------nearBy ==============================
// app.get("/mysticOdisha/near",(req,res,next)=>{
//     const searchButton = document.querySelector('near-search');
//     const {nearBy} = req.query;

//     searchButton.addEventListener('click', () => {
//       const selectedPlace = nearBy;

//       if (!selectedPlace) {
//         alert('Please select a place type!');
//         return;
//       }

//       // Redirect to Google Maps search
//       const searchQuery = encodeURIComponent(selectedPlace);
//       const mapsUrl = `https://www.google.com/maps/search/${searchQuery}`;
//       window.open(mapsUrl, '_blank');
//     });
// })


//=================================middleware==========================
app.get('*',(req,res,next)=>{
    next( new ExpressError(401,"Sorry,Page Not Found"));
})
app.use((err,req,res,next)=>{
      let {status=500,message="client side error"}=err;
      res.status(status).render("error.ejs",{message})
})
app.listen(3030,()=>{
    console.log("app listing on port 3030");
})  