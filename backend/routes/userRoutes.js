const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt=require("bcrypt")

//register
router.post("/register", async (req, res) => {
   const {email,password}=req.body
  try {
    const existUser = await User.findOne({ email });
    if(existUser){
        return res.status(400).send({msg:"user already exist please login"})
    }
    const newUser = new User({ ...req.body });
    const hashedPassword=await bcrypt.hash(password,10)
    newUser.password=hashedPassword
    await newUser.save();
    res.send({ newUser, msg: "user successfully registered" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;
