"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Address.belongsTo(models.User);
      Address.belongsTo(models.Branch);
      // Address.belongsTo(models.City);
    }
  }
  Address.init(
    {
      addressLine: DataTypes.STRING,
      postalCode: DataTypes.INTEGER,
      longitude: DataTypes.STRING,
      lattitude: DataTypes.STRING,
      city: DataTypes.STRING,
      province: DataTypes.STRING,
      detail: DataTypes.STRING,
      defaultAddress: DataTypes.BOOLEAN,
      receiverName: DataTypes.STRING,
      receiverPhone: DataTypes.STRING,
      receiverEmail: DataTypes.STRING,
      district: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      provinceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Address",
    }
  );
  return Address;
};