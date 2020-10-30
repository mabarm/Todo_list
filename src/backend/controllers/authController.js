const dbConn=require("../databases/sqlite");
const user=dbConn.users;

const signup=(req,res)=>{
    const {name,email,password} =req.body;
    if(!(name&&email&&password)){
        return res.render("signup",{
            msg: "Please enter all the required details"});
    }else{
        user.create({name,email,password})
            .then(user=>{
                    console.log(user);
                    req.session.user=user;
                    res.redirect("/");
                    })
            .catch(err=>{
                console.log(err);
                return res.render("signup")
            });
    }
}

const signin=(req,res)=>{
    const {email,password}=req.body;
    if(!(email&&password)){
        return res.render("signin",{ 
            msg : "Incorrect details"});
    }else{
        user.findOne({
            where:{
                email:email,
                password:password
            }})
            .then(user=>{
                        console.log(user);
                        req.session.user=user
                        return res.redirect("/");            
            })
            .catch(err=>{
                console.log(err);
                return res.redirect("/signin");
            });
    }
}

function signout(req, res) {
    req.session.destroy();
    res.redirect("/signin");
}

module.exports={
    signup:signup,
    signin:signin,
    signout:signout
}


