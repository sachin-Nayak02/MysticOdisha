const {getUser}=require("../service/auth")
async function restrictToLoggedinUserOnly(req,res,next){
    const userUid=req.cookies?.uid;

    if(!userUid) return res.redirect("/mysticodisha/Signup&SignIn");
    
    const user=getUser(userUid);
    if(!user) return res.redirect("/mysticodisha/Signup&SignIn");

    req.user=user;
    next();
}

async function checkAuth(req,res,next){
    const userUid=req.cookies?.uid;

    
    
    const user=getUser(userUid);
   

    req.user=user;
    next();
}

module.exports={
    restrictToLoggedinUserOnly,
    checkAuth,
};