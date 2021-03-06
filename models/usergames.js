"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGames.hasOne(models.UserGameBiodatas, {
        foreignKey: "UserId",
        onDelete: "SET NULL",
      });
      UserGames.hasMany(models.UserGameHistories, {
        foreignKey: "UserId",
        onDelete: "SET NULL",
      });
    }
  }
  UserGames.init(
    {
      userName: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserGames",
    }
  );
  return UserGames;
};
