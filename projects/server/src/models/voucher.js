"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Voucher.hasMany(models.User);
      // Voucher.belongsTo(models.Transaction);
    }
  }
  Voucher.init(
    {
      // name: DataTypes.STRING,
      // nominal: DataTypes.INTEGER,
      // startDate: DataTypes.DATE,
      // endDate: DataTypes.DATE,
      // isUsed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Voucher",
    }
  );
  return Voucher;
};