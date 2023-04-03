const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../models/");

router.post("/", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: password,
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;
