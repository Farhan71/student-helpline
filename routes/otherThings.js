const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const OtherThings = require("../models/OtherThings")

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new OtherThings(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await OtherThings.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await OtherThings.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await OtherThings.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await OtherThings.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const filter = req.query.type;
  try {
    let posts;
    if (userId) {
      posts = await OtherThings.find({
        userId:{
          $in: [userId] 
        }
      }).sort({createdAt:-1});
    } 
    
    else if (filter) {
      posts = await OtherThings.find({
        type: {
          $in: [filter],
        }, 
      }
      ).sort({createdAt:-1});
    }
    
    else {
      posts = await OtherThings.find().sort({createdAt:-1});
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
