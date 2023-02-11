"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction_Detail.belongsTo(models.Product);
      Transaction_Detail.belongsTo(models.Transaction);
      Transaction_Detail.belongsTo(models.Branch);
    }
  }
  Transaction_Detail.init(
    {
      qty: DataTypes.INTEGER,
      id_order: DataTypes.STRING,
      totalCheckout: DataTypes.INTEGER,
      totalWeight: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Transaction_Detail",
    }
  );
  return Transaction_Detail;
};