const express = require("express");
const app = express();
const contactRoute = require("./routes/contact");
const UserRoute = require('./routes/user')
const bodyparser = require("body-parser");
const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Admin:System123@test.nsvf4.mongodb.net/?retryWrites=true&w=majority&appName=Test"
    );
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

app.use("/contact", contactRoute);
app.use('/auth',UserRoute)

module.exports = app;
