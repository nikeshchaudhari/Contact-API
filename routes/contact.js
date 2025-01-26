const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// add-contact
router.post("/addcontact", async (req, res) => {
  const data = await new Contact({
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    batch :req.body.batch
  });

  try {
    const addData = await data.save();
    res.status(200).json({
      addContact: addData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
// Get Data 
router.get("/all-contact", async (req, res) => {
  try {
    const getData = await Contact.find().select('_id fullName email phone address batch')
    res.status(200).json({
      allDetails: getData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

// 
router.get('/contactById/:contactId',async(req,res)=>{
 try{
const find = await Contact.findById(req.params.contactId)
 res.status(200).json({
  findData :find
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
