const express=require("express");
const middle=require("../controllers/middle");
const mainController=require("../controllers/mainController");
const authController=require("../controllers/authController");
const todoController=require("../controllers/todoController");
const router=express.Router();

router.route("/").get(middle.redirectSignup,todoController.fetchall);
router.route("/signin").get(middle.redirectprofile,mainController.signin);
router.route("/signup").get(middle.redirectprofile,mainController.signup);

router.route("/").post(todoController.fetchall);
router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);
router.route("/signout").get(authController.signout);

router.route("/add").post(todoController.addToDo);
router.route("/edit/:id").post(todoController.editToDo);
router.route("/done/:id").post(todoController.doneToDo);
router.route("/delete/:id").post(todoController.deleteToDo);

module.exports=router;