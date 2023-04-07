const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Post } = require("../../models/");

// register new user
router.post("/", async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 10);
    const userData = await User.create({
      username: req.body.username,
      password: password,
    });
    res.status(200).json(userData);
  } catch (err) {
    console.log(err);
    if (err.errors[0].message === "username must be unique") {
      res.statusMessage = "Username already taken.";
    }
    if (err.errors[0].message === "Validation len on password failed") {
      res.statusMessage = "Password must be between 6 and 15 characters.";
    }
    res.status(400).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res.statusMessage = "invalid";
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
      res.statusMessage = "invalid";
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

// logout
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

// get user by id and include their posts
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Post }],
    });
    const user = userData.get({ plain: true });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(200).json(err);
  }
});

module.exports = router;
