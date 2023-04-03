const router = require("express").Router();
const { Post, User, Comment } = require("../../models/");

router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.body.user_id,
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll();
    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });
    const post = postData.get({ plain: true });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

module.exports = router;
