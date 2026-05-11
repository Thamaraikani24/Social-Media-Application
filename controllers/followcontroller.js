const User=require('../models/user');
const validateFollowRequest = require('../validation/followvalidation');

exports.followUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const followerId = req.body.followerId;

    if (user.followers.includes(followerId)) {
      return res.status(400).json({
        success: false,
        message: "Already following this user",
      });
    }

    user.followers.push(followerId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "User followed successfully",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("followers", "name email age bio profileImage");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      followersCount: user.followers.length,
      data: user.followers,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Send follow request
exports.sendFollowRequest = async (req, res) => {
  try {

    const error = validateFollowRequest(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error,
      });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const requesterId = req.body.requesterId;

    // already sent request
    if (user.followRequests.includes(requesterId)) {
      return res.status(400).json({
        success: false,
        message: "Request already sent",
      });
    }

    user.followRequests.push(requesterId);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Follow request sent successfully",
      data: user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
// Accept follow request
exports.acceptFollowRequest = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const requesterId = req.body.requesterId;

    // add follower
    user.followers.push(requesterId);

    // remove request
    user.followRequests = user.followRequests.filter(
      (id) => id.toString() !== requesterId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Follow request accepted",
      data: user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
// Reject follow request
exports.rejectFollowRequest = async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const requesterId = req.body.requesterId;

    // remove request
    user.followRequests = user.followRequests.filter(
      (id) => id.toString() !== requesterId
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Follow request rejected",
      requestsCount: user.followRequests.length,
      data: user.followRequests,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
// Remove follower
exports.removeFollower = async (req, res) => {

  try {

    const user = await User.findById(req.params.id);

    const { followerId } = req.body;

    // remove from followers
    user.followers = user.followers.filter(
      (id) => id.toString() !== followerId
    );

    await user.save();

    // remove from following of other user
    const followerUser = await User.findById(followerId);

    followerUser.following = followerUser.following.filter(
      (id) => id.toString() !== req.params.id
    );

    await followerUser.save();

    res.status(200).json({
      success: true,
      message: "Follower removed successfully",
      followersCount: user.followers.length,
      data: user.followers,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

// Get follow requests
exports.getFollowRequests = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .populate("followRequests", "name email bio image");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      requestsCount: user.followRequests.length,
      data: user.followRequests,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};
// Get followers list
exports.getFollowers = async (req, res) => {
  try {

    const user = await User.findById(req.params.id)
      .populate("followers", "name email bio image");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      followersCount: user.followers.length,
      data: user.followers,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};