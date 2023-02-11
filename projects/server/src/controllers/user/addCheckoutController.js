const { Op } = require("sequelize");
const db = require("../../models");
const address = db.Address;

module.exports = {
  mainAddress: async (req, res) => {
    try {
      const response = await address.findOne({
        where: {
          UserId: req.user.id,
          defaultAddress: true,
        },
      });
      res.status(200).send(response);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  allAddress: async (req, res) => {
    try {
      const { receiverName = "", detail = "" } = req.query;
      if (receiverName || detail) {
        const response = await address.findAll({
          where: {
            UserId: req.user.id,
            [Op.or]: {
              receiverName: {
                [Op.like]: `%${receiverName}%`,
              },
              detail: {
                [Op.like]: `%${detail}%`,
              },
            },
          },
          order: [["detail", "DESC"]],
        });
        res.status(200).send(response);
      }
      const response = await address.findAll({
        where: {
          UserId: req.user.id,
        },
        order: [["detail", "DESC"]],
      });
      res.status(200).json(response);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
