const router = require("express").Router();
const { Post, User, Comment } = require("../../models/");

router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      content: req.body.content,
      post_id: req.body.post_id,
    });
    res.status(200).json(commentData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({ include: [{ model: User }] });
    const comments = commentData.map((comment) => comment.get({ plain: true }));
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

module.exports = router;
