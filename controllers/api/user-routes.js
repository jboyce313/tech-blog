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

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res.statusMessage = "There is no account associated with that username.";
      res.status(404).json({
        message: "There is no account associated with that username.",
      });
      return;
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res.statusMessage = "Incorrect password.";
      res.status(400).json({ message: "Incorrect password." });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      //   console.log(
      //     "🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie",
      //     req.session.cookie
      //   );

      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
