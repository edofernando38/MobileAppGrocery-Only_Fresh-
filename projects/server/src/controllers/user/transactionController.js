const db = require("../../models");
const transaction = db.Transaction;
const transactionDetail = db.Transaction_Detail;
const productCart = db.Product_Cart;
const payment = db.Payment;
const product = db.Product;
const price = db.Price;
const branch = db.Branch;
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const schedule = require("node-schedule");

module.exports = {
  create: async (req, res) => {
    let date = new Date();
    date.setDate(date.getDate());
    try {
      let year = date.getFullYear();
      const order = await transaction.findAll();
      const no_order = `OF-${year}${order.length + 1}`;

      const {
        totalOrder,
        totalWeight,
        totalCharge,
        status,
        UserId,
        AdminId,
        id_order,
        ProductId,
        totalCheckout,
        qty,
        BranchId,
        TransactionId,
      } = req.body;
      req.body;
      const result = await transaction.create({
        totalOrder,
        totalWeight,
        totalCharge,
        status: "Waiting Payment",
        UserId,
        AdminId,
        id_order: no_order,
        BranchId,
      });

      const afterSend = moment()
        .add(30, "seconds")
        .format("YYYY-MM-DD HH:mm:ss");

      schedule.scheduleJob(
        afterSend,
        async () =>
          await transaction.update(
            {
              status: "Order Cancelled",
            },
            {
              where: {
                id: result.id,
              },
            }
          )
      );

      const data = await productCart.findAll({
        where: [
          { UserId: req.params.id },
          {
            status: 1,
          },
        ],
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
        ],
      });

      data.map(async (item) => {
        item.dataValues;
        await transactionDetail.create({
          TransactionId: result.id,
          ProductId: item.dataValues.ProductId,
          id_order: result.id_order,
          totalCheckout: item.dataValues.totalCheckout,
          totalWeight: item.dataValues.totalWeight,
          qty: item.dataValues.qty,
          BranchId: item.dataValues.BranchId,
        });
      });

      data.map(async (item) => {
        await productCart.destroy({
          where: {
            id: item.dataValues.id,
          },
        });
      });

      // await transaction.findAll({
      //   order: ["id", "DESC"],
      // });
      res.status(200).send(result);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAllById: async (req, res) => {
    try {
      const transactions = await transaction.findAll({
        where: {
          UserId: req.params.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findById: async (req, res) => {
    try {
      const transactions = await transaction.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findProductById: async (req, res) => {
    try {
      const transactions = await transactionDetail.findAll({
        where: {
          TransactionId: req.params.id,
        },
        include: [{ model: product, include: [{ model: price }] }],
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      "controller", fileUploaded;
      await transaction.update(
        {
          picture: `upload/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getPicture = await transaction.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      const toFalse = await transaction.update(
        {
          status: "Order Cancelled",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const toTwo = await transaction.update(
        {
          status: "Waiting Confirm Payment",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send({
        id: getPicture.id,
        picture: getPicture.picture,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAllByAdmin: async (req, res) => {
    try {
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      findBranch;
      const transactions = await transaction.findAll({
        where: {
          BranchId: findBranch?.dataValues?.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findCancelled: async (req, res) => {
    try {
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });

      const transactions = await transaction.findAll({
        where: {
          status: "Order Cancelled",
          BranchId: findBranch?.dataValues?.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findWaitingPayment: async (req, res) => {
    try {
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });

      const transactions = await transaction.findAll({
        where: {
          status: "Waiting Payment",
          BranchId: findBranch?.dataValues?.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findConfirmPayment: async (req, res) => {
    try {
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });

      const transactions = await transaction.findAll({
        where: {
          status: "Waiting Confirm Payment",
          BranchId: findBranch?.dataValues?.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findOnProcess: async (req, res) => {
    try {
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });

      const transactions = await transaction.findAll({
        where: {
          status: "On Process",
          BranchId: findBranch?.dataValues?.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findDelivery: async (req, res) => {
    try {
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      const transactions = await transaction.findAll({
        where: {
          status: "On Delivery",
          BranchId: findBranch?.dataValues?.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findDone: async (req, res) => {
    try {
      const findBranch = await branch.findOne({
        where: {
          AdminId: req.params.AdminId,
        },
      });
      findBranch;
      const transactions = await transaction.findAll({
        where: {
          status: "Done",
          BranchId: findBranch?.dataValues?.id,
        },
      });
      res.status(200).send(transactions);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  setProcess: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await transaction.update(
        {
          status: "Order Cancelled",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const toThree = await transaction.update(
        {
          status: "On Process",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Set Order Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  setDelivery: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await transaction.update(
        {
          status: "Order Cancelled",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const toFour = await transaction.update(
        {
          status: "On Delivery",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Set Delivery Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  setDone: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await transaction.update(
        {
          status: "Order Cancelled",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const toFive = await transaction.update(
        {
          status: "Done",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Set Done Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  setCancelled: async (req, res) => {
    try {
      const { id } = req.params;
      const toFalse = await transaction.update(
        {
          status: "Order Cancelled",
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).send("Set Cancelled Success");
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findSalesDepok: async (req, res) => {
    try {
      const salesDepok = await transaction.findAll({
        where: {
          BranchId: 1,
        },
      });
      res.status(200).send(salesDepok);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findSalesJaksel: async (req, res) => {
    try {
      const salesJaksel = await transaction.findAll({
        where: {
          BranchId: 2,
        },
      });
      res.status(200).send(salesJaksel);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findSalesJaktim: async (req, res) => {
    try {
      const salesJaktim = await transaction.findAll({
        where: {
          BranchId: 3,
        },
      });
      res.status(200).send(salesJaktim);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalSales: async (req, res) => {
    try {
      const total = await transaction.findOne({
        attributes: [
          "BranchId",
          [Sequelize.fn("sum", Sequelize.col("totalOrder")), "total_order"],
        ],
        group: ["BranchId"],
        where: {
          BranchId: req.params.BranchId,
        },
      });
      res.status(200).send(total);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalSalesAll: async (req, res) => {
    try {
      const total = await transaction.findAll({
        attributes: [
          "BranchId",
          [Sequelize.fn("sum", Sequelize.col("totalOrder")), "total_order"],
        ],
        group: ["BranchId"],
        include: [{ model: branch }],
      });
      console.log(total);
      const salesTotal = total.map((item) => item.dataValues.total_order);

      let numberSalesTotal = [];
      length = salesTotal.length;
      for (let i = 0; i < length; i++)
        numberSalesTotal.push(parseInt(salesTotal[i]));
      console.log(numberSalesTotal);
      res.status(200).send({
        total,
        numberSalesTotal,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  paginationTransaction: async (req, res) => {
    try {
      const { page, limit, search_query, order, sort } = req.query;
      const productlist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * productlist_page;
      const orderby = order || "id_order";
      const direction = sort || "ASC";
      const totalRows = await transaction.count({
        where: {
          [Op.or]: [
            {
              id_order: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              status: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await transaction.findAll({
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
        where: {
          [Op.or]: [
            {
              id_order: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              status: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
        include: [{ model: price }],
        offset: offset,
        limit: list_limit,
        order: [[orderby, direction]],
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
      });

      res.status(200).send({
        result: result,
        page: productlist_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
