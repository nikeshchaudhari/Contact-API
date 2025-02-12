const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Batch = require("../models/Batch");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SCRET,
});

// add Batch
router.post("/add-batch", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      "screte key 123"
    );
    console.log(user);
    const uploadImage = await cloudinary.uploader.upload(
      req.files.photo.tempFilePath
    );
    console.log(uploadImage);

    const addBatch = await new Batch({
      batchName: req.body.batchName,
      details: req.body.details,
      startDate: req.body.startDate,
      duration: req.body.duration,
      uId: user._id,
      imageUrl: uploadImage.secure_url,
      imageId: uploadImage.public_id,
    });

    const batchAdd = await addBatch.save();
    res.status(200).json({
      batchAdd: batchAdd,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
// Get Batch

router.get("/all-batch", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      "screte key 123"
    );
    const batchList = await Batch.find({ uId: user._id });
    res.status(200).json({
      batchList: batchList,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});

// Delete Batch by Batch Id

router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await jwt.verify(
      req.headers.authorization.split(" ")[1],
      "screte key 123"
    );
    const batch = await Batch.find({ _id: req.params.id });
    console.log(batch);
    if (batch[0].uId != user._id) {
      return res.status(500).json({
        error: "invalid User",
      });
    }
    await cloudinary.uploader.destroy(batch[0].imageId);
    await Batch.findByIdAndDelete(req.params.id);
    res.status(200).json({
      msg: "Delete data...",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
});
// Update Batch by batch Id

router.put("/update/:id", async (req, res) => {
try{
    const user = await jwt.verify(req.headers.authorization.split(" ")[1],'screte key 123')
    const data = await Batch.find({_id:req.params.id})
    console.log(data[0]);
    if(data[0].uId != user._id){
      return req.status(500).json({
        error:"invalid Users..."
      })
    }
    if(req.files){
      await cloudinary.uploader.destroy(data[0].imageId)
const uploadImage = await cloudinary.uploader.upload(req.files.photo.tempFilePath)

const upDate ={
  batchName:req.body.batchName,
  details:req.body.details,
  startDate:req.body.startDate,
  duration:req.body.duration,
imageUrl:uploadImage.secure_url,
imageId:uploadImage.public_id
}
const updateData = await Batch.findByIdAndUpdate(req.params.id,upDate,{new:true})
res.status(200).json({
  Update:updateData
})

    }
    else{
      const upDate ={
        batchName:req.body.batchName,
        details:req.body.details,
        startDate:req.body.startDate,
        duration:req.body.duration,
      
      }
      const updateData = await Contact.findByIdAndUpdate(req.params.id,upDate,{new:true})
      res.status(200).json({
        UpdateDAta:updateData
      })
    }
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({
      error:err
    })
    
  }
})
module.exports = router;
