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
      res
        .status(200)
        .json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
    // res.render("/");
    res.status(200).json("You are now logged out");
  } else {
    res.status(404).end();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    const user = userData.get({ plain: true });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

module.exports = router;
