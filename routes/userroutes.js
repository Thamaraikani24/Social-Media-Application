const express = require("express");

const {
  createUser,
  getAllUsers,
  getSingleUser,
  uploadProfileImage
} = require("../controllers/usercontroller");

const upload = require("../middleware/upload");

const router = express.Router();

router.post("/createUser", createUser);

router.get("/getAllUsers", getAllUsers);

router.get("/getSingleUser/:id", getSingleUser);

router.post("/upload-profile/:id",upload.single("profileImage"),uploadProfileImage);

module.exports = router;