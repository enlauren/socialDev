const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const validatePostInput = require("../../validation/post");
const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");

//@oute             GET api/posts/test
// @description     Tests post route
// @access          public
router.get("/test", (req, res) => res.json({ msg: "posts works" }));

//@oute             GET api/posts
// @description     get all posts no pagination
// @access          public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostFound: "No posts found." }));
});

//@oute             GET api/posts/:id
// @description     get post by id
// @access          public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostFound: "No post found with that id." })
    );
});

//@oute             GET api/posts with pagination
// @description     get posts
// @access          public
router.get("/page/:page", (req, res) => {
  Post.paginate({}, { page: req.params.page, sort: { date: -1 }, limit: 10 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostFound: "No posts found." }));
});

//@oute             POST api/posts
// @description     create post
// @access          private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);

//@oute             DELETE api/posts/:id
// @description     delete post by id
// @access          public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notAuthorized: "User not authorized." });
          }
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ noPostFound: "No post found." }));
    });
  }
);
module.exports = router;
