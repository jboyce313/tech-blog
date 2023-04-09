const router = require("express").Router();
const { User, Post, Comment } = require("../models/");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [{ model: User }] });
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

router.get("/dashboard", (req, res) => {
  res.render("dashboard", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        { model: User },
        { model: Comment, include: [{ model: User }] },
      ],
    });
    const post = postData.get({ plain: true });
    res.render("post-comments", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

module.exports = router;
