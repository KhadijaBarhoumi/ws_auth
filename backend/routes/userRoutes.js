const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {registerRules,loginRules,validator}=require("../middlewares/validator")
const isAuth=require("../middlewares/passport")
const isAdmin=require('../middlewares/isAdmin')
const router = express.Router();

//register
router.post("/register",registerRules(),validator, async (req, res) => {
  const { email, password,role } = req.body;
if(role){
  return res.status(400).send({msg:"nooooo "})
}
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).send({ msg: "user already exist please login" });
    }
    const newUser = new User({ ...req.body });
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    res.send({ newUser, msg: "user successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});
//login
router.post("/login",loginRules(),validator, async (req, res) => {
  const { email, password } = req.body;
  try {

    const existUser = await User.findOne({ email });
    /*if(!existUser.ban){
      return res.status(400).send({ msg: "compte not verified" });
    }*/
    if (!existUser) {
      return res.status(400).send({ msg: "bad credentials" });
    }
    const matched = await bcrypt.compare(password, existUser.password);
    if (!matched) {
      return res.status(400).send({ msg: "bad credentials!" });
    }
    const payload = {
      _id: existUser._id,
      name: existUser.fullName,
    };
    const token = jwt.sign(payload, process.env.privateKey);
    console.log(token);
    res.send({ user: existUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

router.get("/current",isAuth(),async(req,res)=>{
  res.send({user:req.user})
})

router.get('/all',isAuth(),isAdmin,async(req,res)=>{
  const allUsers=await User.find()
  res.send({allUsers})
})

module.exports = router;
