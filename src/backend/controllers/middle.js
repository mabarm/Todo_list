const redirectprofile=(req,res,next)=>{
    if(req.session.user)
        res.redirect("/");
    else
        next();
}

const redirectSignup = (req, res, next) => {
    if (req.session.user) {
      next();
    }
    else {
      res.redirect("/signin");
    }
  };
  
module.exports={redirectprofile:redirectprofile,
    redirectSignup}