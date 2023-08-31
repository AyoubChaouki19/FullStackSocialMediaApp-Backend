const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middleware/AuthMiddleware");
router.post("/", validateToken, async (req, res) => {
  const { PostId } = req.body;
  const userId = req.user.id;
  const found = await Likes.findOne({
    where: { UserId: userId, PostId: PostId },
  });
  try{
  if (!found) {
    await Likes.create({ UserId: userId, PostId: PostId });
    res.json({liked:true});
  } else {
    await Likes.destroy({
      where: {
        UserId: userId,
        PostId: PostId,
      },
    });
    res.json({liked:false});
  }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
