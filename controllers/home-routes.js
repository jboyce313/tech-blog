const router = require("express").Router();
const { User, Post, Comment } = require("../models/");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [{ model: User }] });
    // const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

module.exports = router;
