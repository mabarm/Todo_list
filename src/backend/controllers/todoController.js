const dbConn=require("../databases/sqlite");
const list=dbConn.lists;

const addToDo=(req,res)=>{
    const task=req.body.item;
    if(!task){
         res.redirect("/");
    }
    else{
        list.create({
            item: task,
            edit: true,
            done: false,
            user_id: req.session.user.id
            })
        .then(_=>{
            console.log("Task added");
            res.redirect("/")
            })
        .catch(err=>{
            console.log("Task not added");
            res.redirect("/");
            });
} };

const editToDo=(req,res)=>{
        list.update({
                item:req.body.item,
                edit:true
            },
            {
                where:{
                id:req.params.id
                }
            })
            .then(_=>{
                console.log("Task edited");
                res.redirect("/")
                })
            .catch(err=>{
                console.log(err);
                res.redirect("/");
                });
        };

const doneToDo=(req,res)=>{
    let up_done=req.body.done == 0
    console.log(up_done);
    list.update({
        done:up_done
    },
    {
        where:{
            id:req.params.id
        }
    }) 
    .then(_=>{
        console.log("Task done");
        res.redirect("/")
        })
    .catch(err=>{
        console.log(err);
        res.redirect("/");
        });
}

const deleteToDo=(req,res)=>{
    list.destroy({
        where:{
           id:req.params.id
        }
    })
    .then(_=>{
        console.log("Task deleted");
        res.redirect("/")
        })
    .catch(err=>{
        console.log(err);
        res.redirect("/");
        });
}

function fetchall(req,res){
    if(req.session.user){
        list.findAll({
            where: {
                user_id: req.session.user.id
            },
            raw: true,
        })
        .then((list)=>{
            res.render('profile', {
                username: req.session.name,
                list: list
            });
        })
        .catch((err)=>{
            console.log(err)
            res.redirect('/signin');
        });
     }
     else{
        res.redirect('/signin');
     }
}

module.exports={
    addToDo,
    editToDo,
    doneToDo,
    deleteToDo,
    fetchall
};