const express = require("express");

const {
  createUser,
  getAllUsers,
  getSingleUser,
} = require("../controllers/usercontroller");

const router = express.Router();

router.post("/createUser", createUser);        // POST /users/createUser

router.get("/getAllUsers", getAllUsers);         // GET  /users/getAllUsers

router.get("/getSingleUser/:id", getSingleUser); // GET  /users/getSingleUser/:id

module.exports = router;