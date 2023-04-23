const router = require("express").Router();
const { Post, User, Comment } = require("../../models/");

router.post("/", async (req, res) => {
  try {
    const postData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user.id,
    });
    res.status(200).json(postData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: [{ model: User }] });
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
      include: [{ model: Comment, include: [{ model: User }] }],
    });
    const post = postData.get({ plain: true });
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    // console.log(post);
    const updatedTitle = req.body.title;
    const updatedContent = req.body.content;
    post.title = updatedTitle;
    post.content = updatedContent;
    console.log(post);
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      return res.status(404).send("Post not found");
    }
    await post.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred while deleting the post");
  }
});

module.exports = router;
