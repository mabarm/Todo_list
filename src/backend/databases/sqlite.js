const Sequelize=require("sequelize");
const sequelize=new Sequelize({
    dialect: "sqlite",
    storage: "./backend/databases/database.sqlite"
});

const users =sequelize.define("users",{
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    email:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

const lists =sequelize.define("lists",{
   item:{
       type:Sequelize.STRING,
       allowNull:false
   },
   edit:{
       type:Sequelize.BOOLEAN,
       allowNull:false
   },
   done:{
       type:Sequelize.BOOLEAN,
       allowNull:false
   },
   user_id:{
       type:Sequelize.NUMBER,
       allowNull:false
   }
});

sequelize
  .sync()
  .then(()=>console.log("Tables successfully created, if one doesn't exist"))
.catch(err=>console.log("Error in creating tables"));

module.exports={users,lists};