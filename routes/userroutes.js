const express = require("express");

const {
  createUser,
  getAllUsers,
  getSingleUser,
  uploadProfileImage
} = require("../controllers/usercontroller");

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/createUser", createUser);   // Create user

router.get("/getAllUsers", getAllUsers);  // Get all users

router.get("/getSingleUser/:id", getSingleUser);   // Get single user by id

router.post("/upload-profile/:id",upload.single("profileImage"),uploadProfileImage); // Upload profile image for user

module.exports = router; 