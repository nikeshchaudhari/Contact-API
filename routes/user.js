const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

// Users Sign 
router.post("/signup", async (req, res) => {
  try {
const user = await User.find({email:req.body.email})
if(user.length >0){
  return res.status(500).json({
error:"email already register "

  })
}
// console.log(user);


    const hashCode = await bcrypt.hash(req.body.password, 10);
    const data = await new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: hashCode,
      phone: req.body.phone,
      address: req.body.address,
    });
    const addData = await data.save();
    res.status(200).json({
      fullName:addData.fullName,
      email: addData.email,
      phone:addData.phone,
      address:addData.address,
      _id:addData.id
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: err,
    });
  }
});
// Login User
router.post('/login',async(req,res)=>{
  try{
const user = await User.find({email:req.body.email})
if(user.length==0){
  return res.status(500).json({
    error:"Email Not Register"
  })
}
const isMatch = await bcrypt.compare(req.body.password,user[0].password)
if(!isMatch){
return res.status(500).json({
  error:"Invalid Password"
})
}
 const token = await jwt.sign({
  _id:user[0].id,
  fullName:user[0].fullName,
  email:user[0].email,
  phone:user[0].phone,
  address:user[0].address,
 },'screte key 123',{
  expiresIn:'365d'
 })
res.status(200).json({
  _id:user[0].id,
  fullName:user[0].fullName,
  email:user[0].email,
  phone:user[0].phone,
  address:user[0].address,
  token:token

})
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      error:err
    })
    
  }
})

module.exports = router;
