"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Admin.hasMany(models.Branch);
      Admin.hasMany(models.Inventory);
      Admin.hasMany(models.Price);
      // Admin.hasMany(models.Transaction);
    }
  }
  Admin.init(
    {
      username: {
        type: DataTypes.STRING,
        unique: "username",
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique : "email",
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
      isSuper: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};