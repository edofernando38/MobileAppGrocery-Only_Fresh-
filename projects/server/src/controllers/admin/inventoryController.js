const { Op, Sequelize } = require("sequelize");
const db = require("../../models");
const inventory = db.Inventory;
const product = db.Product;
const price = db.Price;
const branch = db.Branch;
const category = db.Category;
const transactionDetail = db.Transaction_Detail;
const transaction = db.Transaction;

module.exports = {
  create: async (req, res) => {
    try {
      const { stockQty, entryDate, BranchId, ProductId, AdminId } = req.body;
      const data = await inventory.create({
        stockQty,
        entryDate,
        BranchId,
        ProductId,
        AdminId,
      });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findByBranch: async (req, res) => {
    try {
      const inventories = await inventory.findAll({
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
          {
            model: branch,
            where: {
              longitude: { [Op.between]: [req.params.from, req.params.to] },
            },
          },
        ],
      });
      res.status(200).send(inventories);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  paginationProduct: async (req, res) => {
    try {
      const { page, limit, search_query, order, sort } = req.query;
      const productlist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * productlist_page;
      const orderby = order || "productName";
      const direction = sort || "ASC";
      const totalRows = await inventory.count({
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              description: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await inventory.findAll({
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              description: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
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

  paginationAdmin: async (req, res) => {
    try {
      const { page, limit, search_query, order, sort } = req.query;
      const productlist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * productlist_page;
      const orderby = order || "productName";
      const direction = sort || "ASC";
      const totalRows = await inventory.count({
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              description: {
                [Op.like]: "%" + search + "%",
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await inventory.findAll({
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
        where: {
          [Op.or]: [
            {
              productName: {
                [Op.like]: "%" + search + "%",
              },
            },
            {
              description: {
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

  searchBy: async (req, res) => {
    try {
      const { productName, description } = req.query;
      const products = await inventory.findAll({
        where: {
          [Op.or]: {
            productName: {
              [Op.like]: `%${productName}%`,
            },
          },
        },
        raw: true,
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalProduct: async (req, res) => {
    try {
      const products = await inventory.findAll({
        attributes: [[sequelize.fn("count", sequelize.col(`id`)), "total"]],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  sortBy: async (req, res) => {
    try {
      const { data, order } = req.query;
      const products = await inventory.findAll({
        order: [[data, order]],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAllByBranch: async (req, res) => {
    try {
      const inventories = await inventory.findAll({
        where: {
          BranchId: req.params.BranchId,
        },
        include: [
          {
            model: product,
            include: [{ model: price }],
          },
          {
            model: branch,
            include: [
              {
                model: transactionDetail,
                // ({
                //   attributes: [
                //     "ProductId",
                //     "BranchId",
                //     [Sequelize.fn("sum", Sequelize.col("qty")), "total_qty"],
                //   ],
                //   group: ["ProductId"],
                // }),
              },
            ],
          },
        ],
      });
      res.status(200).send(inventories);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  totalInventory: async (req, res) => {
    try {
      const total = await inventory.findAll({
        attributes: ["id", "ProductId", "stockQty", "BranchId"],
        where: {
          BranchId: req.params.BranchId,
        },
        raw: true,
      });

      const stock = await transactionDetail.findAll({
        attributes: [
          "ProductId",
          "BranchId",
          [Sequelize.fn("sum", Sequelize.col("qty")), "total_qty"],
        ],
        group: ["ProductId"],
        where: {
          BranchId: req.params.BranchId,
        },
        include: [{ model: transaction, attributes: ["status"] }],
        raw: true,
      });

      // const statusOK = stock.map(
      //   (item) =>
      //     item["Transaction.status"] === "On Process" || "On Delivery" || "Done"
      // );
      // console.log(statusOK);

      const qtyOne = total.map((item) => item.stockQty);

      const qtyTwo = stock.map((item) => item.total_qty);

      let numberQtyTwo = [];
      length = qtyTwo.length;
      for (let i = 0; i < length; i++) numberQtyTwo.push(parseInt(qtyTwo[i]));

      let finalQty = qtyOne.map((item, index) => {
        return item - numberQtyTwo[index];
      });

      for (let i = 0; i < finalQty.length; i++) {
        await inventory.update(
          {
            totalQty: finalQty[i],
          },
          {
            where: {
              id: total[i].id,
            },
          }
        );
      }

      res.status(200).send({
        total,
        stock,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { productName, entryDate, stockQty } = req.body;

      await inventory.update(
        {
          productName,
          entryDate,
          stockQty,
        },
        {
          where: { id: req.params.id },
        }
      );
      const edit = await inventory.findOne({ where: { id: req.params.id } });
      res.status(200).send(edit);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  stockTaken: async (req, res) => {
    try {
      const total = await inventory.findAll({
        attributes: ["id", "ProductId", "stockQty", "BranchId"],
        where: {
          BranchId: req.params.BranchId,
        },
        raw: true,
      });

      const stock = await transactionDetail.findAll({
        attributes: [
          "ProductId",
          "BranchId",
          [Sequelize.fn("sum", Sequelize.col("qty")), "total_qty"],
        ],
        group: ["ProductId"],
        where: {
          BranchId: req.params.BranchId,
        },
        include: [{ model: transaction, attributes: ["status"] }],
        raw: true,
      });

      const statusOK = stock.map(
        (item) => item["Transaction.status"] === "On Process"
      );
      console.log(statusOK);

      const qtyOne = total.map((item) => item.stockQty);

      const qtyTwo = stock.map((item) => item.total_qty);

      let numberQtyTwo = [];
      length = qtyTwo.length;
      for (let i = 0; i < length; i++) numberQtyTwo.push(parseInt(qtyTwo[i]));

      let finalQty = qtyOne.map((item, index) => {
        return item - numberQtyTwo[index];
      });

      res.status(200).send(stock);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};
