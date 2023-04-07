const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userInfo = require("./userSchema");
const app = express();
app.options("*", cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/Personal");
app.use(express.json());

app.post("/ragister/:users", async (req, res) => {
  const {
    salutation,
    fname,
    lname,
    dob,
    currentAge,
    username,
    city,
    state,
    mobileNo,
  } = req.body;

  if (!fname) {
    return res.status(422).json({ error: "Please fill your details" });
  }

  try {
    const userExist = await userInfo.findOne({ mobileNo: mobileNo });

    if (userExist) {
      return res.status(422).json({ message: "number already exits!!!" });
    }
    const data = new userInfo(req.body);
    const result = await data.save();
    if (result) {
      res.status(201).json({ message: "Form submitted sucessfully!!" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get("/ragister/:users", async (req, res) => {
  let data = await userInfo.find();
  res.send(data);
});

app.put("/ragister/:users/:id", (req, res) => {
  const id = req.params.id; // Get the document ID from the URL parameter
  const data = req.body; // Get the updated data from the request body

  // Update the document in MongoDB
  userInfo
    .findByIdAndUpdate(id, data, { new: true })
    .then((updatedDoc) => {
      // Send the updated document as the response
      res.json(updatedDoc);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ message: "An error occurred while updating the document." });
    });
});

app.listen(5200, (err) => {
  console.log("server started");
  if (err) {
    console.log(err);
  }
});
