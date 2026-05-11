require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const connectDB=require("./config/db");

const app = express();


// MIDDLEWARE
app.use(express.json());

connectDB();


// ROUTES
app.use("/users", require("./routes/userroutes"));
app.use("/follow",require("./routes/followroutes"));


// DEFAULT ROUTE
app.get("/", (req, res) => {
  res.send("Social Media API Running");
});


// Port
const PORT = process.env.PORT || 4000;


// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});