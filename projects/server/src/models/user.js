"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Address);
      User.hasMany(models.Transaction);
      // User.hasMany(models.Cart);
      // User.belongsTo(models.Voucher);
      User.hasMany(models.Product_Cart)
      
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "email",
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "phoneNumber",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
      // status: {
      //   type: DataTypes.BOOLEAN,
      //   defaultValue: true,
      // },
      code_otp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      // attempt: {
      //   type: DataTypes.INTEGER,
      //   defaultValue: 0,
      // },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};