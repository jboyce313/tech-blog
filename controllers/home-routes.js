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

router.get("/create-post", (req, res) => {
  res.render("create-post", {
    loggedIn: req.session.loggedIn,
  });
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/edit-post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const post = postData.get({ plain: true });
    console.log(post.title);
    res.render("edit-post", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user.id, {
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    const posts = user.posts;
    console.log(posts);
    res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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

    let ownPost = false;
    if (req.session.loggedIn && req.session.user.id === post.user.id) {
      ownPost = true;
    }

    res.render("post-comments", {
      post,
      loggedIn: req.session.loggedIn,
      ownPost,
    });
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

module.exports = router;
