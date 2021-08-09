"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameHistories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      UserGameHistories.belongsTo(models.UserGames, {
        foreignKey: "UserId",
        onDelete: "SET NULL",
      });
    }
  }
  UserGameHistories.init(
    {
      score: DataTypes.INTEGER,
      achieved_on: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserGameHistories",
    }
  );
  return UserGameHistories;
};
