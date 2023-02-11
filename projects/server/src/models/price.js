"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Price.belongsTo(models.Admin);
      Price.belongsTo(models.Product);
      // Price.hasMany(models.Product_Cart);
      Price.belongsTo(models.Discount)
    }
  }
  Price.init(
    {
      productPrice: DataTypes.INTEGER,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
      isDisc: DataTypes.BOOLEAN,
      discPrice: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Price",
    }
  );
  return Price;
};