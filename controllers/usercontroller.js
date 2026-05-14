const User = require('../models/user');
const validateUser = require('../validation/uservalidation');

// create user
exports.createUser = async (req, res) => {
  try {
    const error = validateUser(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    const usersWithImageUrl = users.map((user) => ({
      ...user.toObject(),
      profilePicture: user.profilePicture
        ? `https://${ process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${user.profilePicture}`
        : null
    }));

    res.status(200).json({
      success: true,
      count: users.length,
      data: usersWithImageUrl,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get single user
exports.getSingleUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    console.log("USER DATA:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userData = {
      ...user.toObject(),
      profilePicture: user.profilePicture
        ? `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${user.profilePicture}`
        : null
    };

    res.status(200).json({
      success: true,
      data: userData,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// upload profile image
exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        profilePicture: req.file.key
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};