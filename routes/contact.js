const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Contact = require("../models/Contact")

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Contact(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Contact.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         const updatedPost = await Contact.findByIdAndUpdate(
//           req.params.id,
//           {
//             $set: req.body,
//           },
//           { new: true }
//         );
//         res.status(200).json(updatedPost);
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can update only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//DELETE POST
// router.delete("/:id", async (req, res) => {
//   try {
//     const post = await Contact.findById(req.params.id);
//     if (post.username === req.body.username) {
//       try {
//         await post.delete();
//         res.status(200).json("Post has been deleted...");
//       } catch (err) {
//         res.status(500).json(err);
//       }
//     } else {
//       res.status(401).json("You can delete only your post!");
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET POST
// router.get("/:id", async (req, res) => {
//   try {
//     const post = await Contact.findById(req.params.id);
//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

//GET ALL POSTS
// router.get("/", async (req, res) => {
//   const userId = req.query.userId;
//   const filter = req.query.location;
//   try {
//     let posts;
//     if (userId) {
//       posts = await Contact.find({
//         userId:{
//           $in: [userId] 
//         }
//       });
//     } 
//     else if (filter) {
//       posts = await Contact.find({
//         location: {
//           $in: [filter],
//         }, 
//       }
//       );
//     }
//      else {
//       posts = await Contact.find();
//     }
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
