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


app.listen(4000,()=>{
    console.log("listening to 4000");
});

module.exports=app;
