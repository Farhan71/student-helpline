const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const ValidUsers = require("../models/ValidUsers")



//GET POST
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await ValidUsers.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ALL POSTS
router.get("/", async (req, res) => {
  const email = req.query.email;
  
  // console.log(req)
  // console.log(res)
  try {
    let posts;
    if (email) {
      posts = await ValidUsers.findOne({"email":email});
    } 
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
