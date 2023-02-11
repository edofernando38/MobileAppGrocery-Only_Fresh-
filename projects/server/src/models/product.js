"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.hasOne(models.Discount);
      Product.hasOne(models.Price);
      Product.hasMany(models.Inventory);
      Product.hasMany(models.Transaction_Detail);
      Product.hasMany(models.Product_Category);
      Product.hasMany(models.Product_Cart);
      Product.hasOne(models.Promotion);
    }
  }
  Product.init(
    {
      productName: DataTypes.STRING,
      distributor: DataTypes.STRING,
      description: DataTypes.STRING,
      picture: DataTypes.STRING,
      weight: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};