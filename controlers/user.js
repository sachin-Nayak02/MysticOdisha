const User=require("../router/user")

async function handelUserSignup(req,res){
    const {name,email,password}=req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.render("/")
};

module.exports={
    handelUserSignup,
}