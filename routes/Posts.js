const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");
router.get("/",validateToken,async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({where:{UserId:req.user.id}})
  res.json({listOfPosts:listOfPosts,likedPosts:likedPosts});
});
//made change
router.post("/",validateToken, async (req, res) => {
  const post = req.body;
  const username = req.user.username;
  post.username = username;
  await Posts.create(post);
  res.json(post);
});
router.delete("/:id", validateToken, async (req, res) => {
  const postId = req.params.id; // Get the post ID from the URL
  try {
    const deletedPost = await Posts.destroy({
      where: { id: postId },
    });
    if (deletedPost) {
      res.status(204).send(); // 204 No Content indicates successful deletion
    } else {
      res.status(404).json({ error: "Post not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id, { include: Likes });
  res.json(post);
});
module.exports = router;
