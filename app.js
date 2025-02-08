const express = require("express");
const app = express();
const contactRoute = require("./routes/contact");
const UserRoute = require('./routes/user')
const bodyparser = require("body-parser");
const fileUpload = require('express-fileupload')
const mongoose = require("mongoose");

require('dotenv').config()

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected...");
  } catch (err) {
    console.log("something wrong");
    console.log(err);
  }
};
dbConnect();

app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(bodyparser.json());
app.use(fileUpload({
  useTempFiles : true,
  // tempFileDir : '/tmp/'
}));
app.use("/contact", contactRoute);
app.use('/auth',UserRoute)

module.exports = app;
