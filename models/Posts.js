module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allow: false,
      type: DataTypes.STRING,
    },
    postText: {
      allow: false,
      type: DataTypes.STRING,
    },
  });
  Posts.associate = (models) => {
    Posts.hasMany(models.Comments, {
      onDelete: "cascade", //delete every comment when we delete a post
    });
    Posts.hasMany(models.Likes, {
      onDelete: "cascade", //delete every comment when we delete a post
    });
  };
  return Posts;
};
