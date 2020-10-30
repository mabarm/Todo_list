const express=require("express");
const path=require("path");
const route=require("./backend/routes/MainRoutes");
const session=require("express-session");
const cookieParser=require("cookie-parser");
const obj=require("./backend/databases/sqlite")
const app=express();
//require("./backend/databases/sqlite");

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
    secret:"KonfinitySecretKey",
    resave:false,
    saveUninitialized:false,
    cookie:{ }
}));

app.use(express.static(path.join(__dirname,"client")));
app.set("views",__dirname+"/client/views");
app.engine("html",require("ejs").renderFile);
app.set("view engine","ejs");

app.use("/",route);
/*
app.get("/geton",(req,res)=>{
    obj.users
    .findAll({
       where:{
           email:"led@zeppelin.com"}
    }).then(users=>{
        res.send({
            data:users
        })
    }).catch(err=>console.log("Oops! Something went wrong: ",err))
});

app.get("/getout",(req,res)=>{
    obj.users.destroy({
        where:{
            name: "Led Zeppelin", 
            email: "led@zeppelin.com",
            password: "stairwaytoheaven"
        },
        truncate:true
    }).then(result=>console.log("Destroy: success"))
    .catch(err=>console.log("Oops! Something went wrong: ",err));
})*/

app.listen(4000,()=>{
    console.log("listening to 4000");
});

module.exports=app;
//5,7 do..src,all 1 file must