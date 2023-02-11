"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Cart.belongsTo(models.Product);
      Product_Cart.belongsTo(models.User);
      // Product_Cart.belongsTo(models.Price);
      Product_Cart.belongsTo(models.Branch)
      // Product_Cart.belongsTo(models.Cart);
    }
  }
  Product_Cart.init(
    {
      description: DataTypes.STRING,
      qty: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
      totalCheckout: DataTypes.INTEGER,
      totalWeight: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Cart",
    }
  );
  return Product_Cart;
};