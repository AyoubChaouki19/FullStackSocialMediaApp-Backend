const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const listOfComments = await Comments.findAll({
    where: { PostId: postId },
  });
  res.json(listOfComments);
});
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  comment.username = req.user.username;
  const createdComment=await Comments.create(comment);
  res.json(comment);
});
router.delete("/deleteComment/:id",validateToken,async (req, res) => {
  const commentId = req.params.id; // Get the post ID from the URL
  try {
    // res.json(req.user);
    const deletedComment = await Comments.destroy({
      where: { id: commentId },
    });
    if (deletedComment) {
      res.status(204).send(); // 204 No Content indicates successful deletion
    } else {
      res.status(404).json({ error: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
