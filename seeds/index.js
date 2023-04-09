const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models/");
const postData = require("./post-seeds.json");
const bcrypt = require("bcrypt");
const userData = require("./user-seeds.json");
const commentData = require("./comment-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  for (const user of userData) {
    const passwordHashed = await bcrypt.hash(user.password, 10);
    const newUser = await User.create({
      ...user,
      password: passwordHashed,
    });
  }

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  const comments = await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
