const Post = require("../models/Post");
const User = require("../models/User");
const fileHelper = require("../utils/file");
/* CREATE */
exports.createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
exports.getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */

exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* DELETE */

exports.deletePost = async (req, res) => {
  try {
    const { id} = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
    } else {
      if (post.picturePath) {
        fileHelper.deleteFile(`public/assets/${post.picturePath}`);
      }
      await Post.deleteOne({ _id: id });
      const posts = await Post.find()

     

      res.status(200).json({ message: "Success! Post deleted!", posts });
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
