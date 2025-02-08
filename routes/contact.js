const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const jwt = require('jsonwebtoken')
// add data in database
router.post("/add-contact", async (req,res) => {
  try {
    const user = await jwt.verify(req.headers.authorization.split(" ")[1],'screte key 123')
    console.log(user);
    
    const data = await new Contact({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      batch: req.body.batch,
      uId:user._id
    });
    const addData = await data.save();
    res.status(200).json({
      addData: addData,
    });
  // console.log(req.headers.authorization.split(" ")[1]);
  } catch (err) {
    
    console.log(err);
    res.status(500).json({
      error: err,
     
    });
  }
 
  
});
// Get all data in database
router.get("/all-contact", async (req, res) => {
  try {
    const user = await jwt.verify(req.headers.authorization.split(" ")[1],'screte key 123')
   const contactList=  await Contact.find({uId:user._id})
  
    res.status(200).json({
      allContact: contactList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Get data by Id.....
router.get('/contactById/:contact',async(req,res)=>{
  try{
   const user = await jwt.verify(req.headers.authorization.split(" ")[1], 'screte key 123')
    console.log();
    
    const data = await Contact.findById({_id:req.params.contact,uId:user._id})
    res.status(200).json({
      Get:data
    })

  }
  catch(err){
    console.log(err);
    res.status(500).json({
      error:err
    })
    
  }
})
// 
router.get('/batchName/:batchName',async(req,res)=>{
  try{
   const user=  await jwt.verify(req.headers.authorization.split(" ")[1],'screte key 123')
const data = await Contact.find({batch:req.params.batchName,uId:user._id})
res.status(200).json({
  Batch:data
})
  }
  catch(err){
console.log(err);
res.status(500).json({
  error:err
})

  }
})
// 
router.delete('/delete/:id',async(req,res)=>{
  try{
   const user = await jwt.verify(req.headers.authorization.split(" ")[1],'screte key 123')
    console.log(user);
    
    const data = await Contact.find({_id:req.params.id})
    console.log(data[0]);
    
    if(data[0].uId != user._id){
   return  res.status(500).json({
  error:"Invalid user...."
})
}
const deleteData = await Contact.findByIdAndDelete(req.params.id)
res.status(200).json({
  delete:"deleteData"
})
    }
   
  catch(err){
    console.log(err);
    res.status(500).json({
      error:err
    })
    
  }
 
})
// 
router.put('/update/:id',async(req,res)=>{
  try{
    const user = await jwt.verify(req.headers.authorization.split(" ")[1],'screte key 123')
    const data = await Contact.find({_id:req.params.id})
    console.log(data[0]);
    if(data[0].uId != user._id){
      return req.status(500).json({
        error:"invalid Users..."
      })
    }
    const upDate ={
      fullName:req.body.fullName,
      email:req.body.email,
      phone:req.body.phone,
      address:req.body.address,
    batch:req.body.batch
    }
    const updateData = await Contact.findByIdAndUpdate(req.params.id,upDate,{new:true})
    res.status(200).json({
      Update:updateData
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
