"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // City.hasMany(models.Address);
      // City.hasMany(models.Branch);
    }
  }
  City.init(
    {
      // cityName: DataTypes.STRING,
      // kelurahan: DataTypes.STRING,
      // kecamatan: DataTypes.STRING,
      // province: DataTypes.STRING,
      // longitude: DataTypes.STRING,
      // lattitude: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "City",
    }
  );
  return City;
};