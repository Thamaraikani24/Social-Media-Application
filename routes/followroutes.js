const express = require("express");

const {
  sendFollowRequest,
  acceptFollowRequest,
  rejectFollowRequest,
  removeFollower,
  getFollowRequests,
  getFollowers,
} = require("../controllers/followcontroller");

const router = express.Router();

router.put("/follow-request/:id", sendFollowRequest);  // Send follow request

router.put("/accept-request/:id", acceptFollowRequest);  // Accept follow request

router.put("/reject-request/:id", rejectFollowRequest);  // Reject follow request

router.put("/remove-request/:id", removeFollower);  // Remove follower from the profile

router.get("/follow-requests/:id", getFollowRequests); // get follow requests

router.get("/followers/:id", getFollowers);   // get followers

module.exports = router;