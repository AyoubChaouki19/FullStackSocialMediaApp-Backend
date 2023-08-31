const express = require("express");
const db = require("./models");
const postRouter = require("./routes/Posts");
const commentRouter = require("./routes/Comments");
const userRouter = require("./routes/Users");
const likeRouter = require("./routes/Likes");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
//Whenever we want to start our server or api we check if the tables on the models folder exists in our database if no we add them
app.use(cors());
db.sequelize
  .sync()
  .then(() => {
    app.listen(3004, () => {
      console.log(`Post app file Server running on port 3004...`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
//Router
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/auth", userRouter);
app.use("/likes", likeRouter);
