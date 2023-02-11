const db = require("../../models");
const discount = db.Discount;
const voucher = db.Voucher;
const transaction = db.Transaction;
const price = db.Price;
const promotion = db.Promotion;

module.exports = {
  createDiscount: async (req, res) => {
    try {
      const { nominal, isActive } = req.body;
      const result = await discount.create({
        nominal,
        isActive: 1,
      });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createVoucherOrder: async (req, res) => {
    try {
      const {} = req.body;
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findDiscount: async (req, res) => {
    try {
      const result = await discount.findOne({});
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updatePrice: async (req, res) => {
    try {
      const { discPrice, productPrice } = req.body;
      const result = await discount.findOne({
        raw: true,
      });

      const data = await price.update(
        {
          discPrice: productPrice - result.nominal,
          // totalCheckout: qty * response["Product.Price.productPrice"],
          // totalWeight: qty * response["Product.weight"],
        },
        {
          where: { id: req.params.id },
        }
      );

      res.status(200).send({
        message: "Update success",
        data,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
