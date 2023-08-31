module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allow: false,
      type: DataTypes.STRING,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Likes, {
      onDelete: "cascade", //delete every comment when we delete a post
    });
  };
  return Users;
};
