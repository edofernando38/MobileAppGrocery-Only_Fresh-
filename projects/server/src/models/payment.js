"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Payment.belongsTo(models.Transaction);
      // Payment.hasOne(models.Notification);
    }
  }
  Payment.init(
    {
      // description: DataTypes.STRING,
      // waitingPayment: DataTypes.BOOLEAN,
      // paymentDate: DataTypes.DATE,
      // picture: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};