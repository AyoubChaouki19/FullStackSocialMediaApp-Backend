const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const {validateToken}=require("../middleware/AuthMiddleware");
//Register Endpoint
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCESS");
  });
});
//Login Endpoint
router.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const user = await Users.findOne({ where: { username: username } });
  if (user) {
    bcrypt.compare(password, user.password).then((same) => {
      if (!same) {
        response.json({ error: "Wrong username or password" });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "secret"
        );
        response.json(accessToken);
      }
    });
  } else {
    response.json({ error: "User does not exist" });
  }
});
router.get("/validate",validateToken,async(req,res)=>{
res.json(req.user);
})
module.exports = router;
