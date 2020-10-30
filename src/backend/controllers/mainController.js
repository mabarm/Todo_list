const signin=(req,res)=>{
    res.render("signin");
}

const signup=(req,res)=>{
    res.render("signup");
}

module.exports={
    signin:signin,
    signup:signup,

}