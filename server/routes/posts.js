const express = require("express");
const {getFeedPosts, getUserPosts, likePost, deletePost} = require("../controllers/posts")
const {verifyToken} = require("../middleware/auth");

const router = express.Router();

/* read */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* update */
router.put("/:id/like", verifyToken, likePost);

/* delete */
router.delete("/:id/:postId/deletePost", verifyToken, deletePost)


module.exports = router;

