const express = require("express");

const {
  followUser,
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  removeFollower,
  blockFollower,
  getBlockedFollowers,
  getFollowRequests,
  getFollowers,
  getFollowing,
} = require("../controllers/followcontroller");

const router = express.Router();

router.put("/follow/:id",followUser); // Follow or unfollow a user

router.put("/follow-request/:id", sendFollowRequest);  // Send follow request

router.put("/accept-request/:id", acceptFollowRequest);  // Accept follow request

router.put("/reject-request/:id", rejectFollowRequest);  // Reject follow request

router.put("/remove-request/:id", removeFollower); // Remove follower from the profile

router.put("/block-follower/:id", blockFollower); // Block follower from the profile

router.get("/follow-requests/:id", getFollowRequests); // get follow requests

router.get("/followers/:id", getFollowers);   // get followers

router.get("/blocked-followers/:id", getBlockedFollowers); // get blocked followers

router.get("/following/:id", getFollowing); // get following

module.exports = router;