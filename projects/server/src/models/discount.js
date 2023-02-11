"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Discount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Discount.belongsTo(models.Product);
      Discount.hasMany(models.Price)
    }
  }
  Discount.init(
    {
      // percent: DataTypes.STRING,
      nominal: DataTypes.INTEGER,
      isActive: DataTypes.BOOLEAN,
      // startDate: DataTypes.DATE,
      // endDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Discount",
    }
  );
  return Discount;
};