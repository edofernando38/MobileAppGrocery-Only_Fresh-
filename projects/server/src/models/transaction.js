"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User);
      Transaction.belongsTo(models.Branch);
      // Transaction.belongsTo(models.Inventory);
      // Transaction.hasOne(models.Payment);
      Transaction.hasOne(models.Transaction_Detail);
      // Transaction.hasMany(models.Voucher);
      Transaction.hasMany(models.Notification);
    }
  }
  Transaction.init(
    {
      id_order: DataTypes.STRING,
      isVoucher: DataTypes.BOOLEAN,
      status: DataTypes.ENUM(
        "Order Cancelled",
        "Waiting Payment",
        "Waiting Confirm Payment",
        "On Process",
        "On Delivery",
        "Done"
      ),
      totalCharge: DataTypes.INTEGER,
      totalOrder: DataTypes.INTEGER,
      totalWeight: DataTypes.INTEGER,
      // deliveryDate: DataTypes.DATEONLY,
      // arrivalDate: DataTypes.DATEONLY
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};