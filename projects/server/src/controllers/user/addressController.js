const { Op } = require("sequelize");
const axios = require("axios");
const db = require("../../models");
const address = db.Address;
const user = db.User;
const branch = db.Branch;
const productCart = db.Product_Cart;
const rajaOngkirKey = process.env.RAJA_KEY;
const openCageKey = process.env.GEO_KEY;
const rajaOngkirURL = process.env.BASE_URL_RAJAONGKIR;
const openCageURL = process.env.OPENCAGE_URL;

module.exports = {
  addressById: async (req, res) => {
    try {
      const response = await address.findAll({
        where: {
          UserId: req.params.id,
        },
        order: [["defaultAddress", "DESC"]],
      });
      return res.status(200).send({
        message: "User Address retrieved",
        data: response,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  newAddress: async (req, res) => {
    try {
      const {
        receiverName,
        receiverPhone,
        addressLine,
        city,
        province,
        postalCode,
        detail,
        district,
      } = req.body;

      const provinceAndCity = await axios.get(
        `${rajaOngkirURL}/city?id=${city}&province=${province}&key=${rajaOngkirKey}`
      );

      const branchCity = await branch.findOne({
        where: {
          cityId: city,
        },
        raw: true,
      });
      if (!branchCity) throw `Area not supported yet`

      const provinceName = provinceAndCity.data.rajaongkir.results.province;
      const cityName = provinceAndCity.data.rajaongkir.results.city_name;
      const cityType = provinceAndCity.data.rajaongkir.results.type;
      const cityNameAndType = `${cityType} ${cityName}`;
      const postal = provinceAndCity.data.rajaongkir.results.postal_code;
      const location = await axios.get(
        `${openCageURL}/json?key=${openCageKey}&q=${cityNameAndType},${provinceName}`
      );
      const lattitude = location.data.results[0].geometry.lat;
      const longitude = location.data.results[0].geometry.lng;

      const response = await address.create({
        receiverName,
        receiverPhone,
        addressLine,
        provinceId: province,
        province: provinceName,
        cityId: city,
        city: cityNameAndType,
        postalCode: postal,
        detail,
        district,
        lattitude,
        longitude,
        defaultAddress: false,
        UserId: req.params.id,
        BranchId: branchCity.id,
      });

      await branch.findOne({});
      res.status(200).json({
        message: "New Address created",
        data: response,
      });
    } catch (err) {
      console.log(err)
      res.status(400).send(err);
    }
  },

  updateAddress: async (req, res) => {
    try {
      const {
        receiverName,
        receiverPhone,
        addressLine,
        province,
        city,
        postalCode,
        detail,
        district,
      } = req.body;
      const { id } = req.params;
      const provinceAndCity = await axios.get(
        `${rajaOngkirURL}/city?id=${city}&province=${province}&key=${rajaOngkirKey}`
      );
      const provinceName = provinceAndCity.data.rajaongkir.results.province;
      const cityName = provinceAndCity.data.rajaongkir.results.city_name;
      const cityType = provinceAndCity.data.rajaongkir.results.type;
      const cityNameAndType = `${cityType} ${cityName}`;
      const location = await axios.get(
        `${openCageURL}/json?key=${openCageKey}&q=${cityNameAndType},${provinceName}`
      );
      const lattitude = location.data.results[0].geometry.lat;
      const longitude = location.data.results[0].geometry.lng;
      await address.update(
        {
          receiverName,
          receiverPhone,
          addressLine,
          provinceId: province,
          province: provinceName,
          cityId: city,
          city: cityNameAndType,
          postalCode,
          detail,
          district,
          lattitude,
          longitude,
        },
        {
          where: {
            id: id,
          },
        }
      );
      const findData = await address.findByPk(id);
      res.status(200).send({
        message: "Address edited",
        data: findData,
      });
    } catch (err) {
      console.log(err)
      res.status(400).send(err);
    }
  },

  deleteAddress: async (req, res) => {
    try {
      const { id } = req.params;
      await address.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({
        message: "Address deleted",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  setDefault: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await address.update(
        {
          defaultAddress: false,
        },
        {
          where: {
            UserId: req.params.UserId,
          },
        }
      );
      const toTrue = await address.update(
        {
          defaultAddress: true,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      await productCart.destroy({
        where: {
          UserId: req.params.UserId,
        },
      });
      res.status(200).send("Set default success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAddressById: async (req, res) => {
    try {
      const response = await address.findOne({
        where: {
          UserId: req.params.id,
          id: req.body.id,
        },
      });
      return res.status(200).send({
        message: "Data retrieved",
        data: response,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findDefault: async (req, res) => {
    try {
      const defaultAdd = await address.findOne({
        where: {
          defaultAddress: 1,
          UserId: req.params.id,
        },
        include: [
          {
            model: branch,
          },
          {
            model: user,
          },
        ],
        raw: true,
      });
      res.status(200).send({
        message: "Default Address Found",
        defaultAdd,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
