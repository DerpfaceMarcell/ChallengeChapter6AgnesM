"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodatas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameBiodatas.belongsTo(models.UserGames, {
        foreignKey: "UserId",
        onDelete: "SET NULL",
      });
    }
  }
  UserGameBiodatas.init(
    {
      birthDate: DataTypes.DATE,
      gender: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "UserGameBiodatas",
    }
  );
  return UserGameBiodatas;
};
