const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models/");
const postData = require("./post-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
