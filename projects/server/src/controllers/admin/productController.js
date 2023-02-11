const { Op, Sequelize } = require("sequelize");
const db = require("../../models");
const product = db.Product;
const price = db.Price;
const category = db.Category;
const discount = db.Discount;
const productCategory = db.Product_Category;

module.exports = {
  create: async (req, res) => {
    try {
      const { productName, description, CategoryId } = req.body;

      if (!productName && !description) throw "required field";

      const result = await product.create({
        productName,
        description,
        CategoryId,
      });

      const data = await product.findAll({
        where: {
          id: result.id,
        },
      });

      data.map(async (item) => {
        await productCategory.create({
          CategoryId,
          ProductId: item.id,
        });
      });

      res.status(200).send("Successfully Added");
    } catch (err) {
      res.status(400).send({
        message: "Process error",
        err,
      });
    }
  },

  createCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;

      await category.create({
        categoryName,
      });
      res.status(200).send({
        message: "Successfully Added",
      });
    } catch (err) {
      res.status(400).send({
        message: "Process error",
        err,
      });
    }
  },

  findAll: async (req, res) => {
    try {
      const products = await product.findAll({
        attributes: [
          "id",
          "productName",
          "description",
          "picture",
        ],
        include: [{ model: price }],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAllCategory: async (req, res) => {
    try {
      const categories = await category.findAll({
        attributes: ["id", "categoryName", "categoryPicture"],
      });
      res.status(200).send(categories);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findByProductId: async (req, res) => {
    try {
      const products = await product.findOne({
        where: {
          id: req.params.id,
        },
        include: [{ model: productCategory, include: [{ model: category }] }],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findByCategoryId: async (req, res) => {
    try {
      const products = await category.findAll({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: productCategory,
            include: [
              {
                model: product,
                include: [
                  {
                    model: price,
                  },
                ],
              },
            ],
          },
        ],
      });
      res.status(200).send(products);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  remove: async (req, res) => {
    try {
      await product.destroy({
        where: {
          id: req.params.id,
        },
      });
      const deleteProduct = await product.findAll();
      res.status(200).send(deleteProduct);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  removeCategory: async (req, res) => {
    try {
      await category.destroy({
        where: {
          id: req.params.id,
        },
      });

      const deleteCategory = await category.findAll();
      res.status(200).send(deleteCategory);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  update: async (req, res) => {
    try {
      const { productName, distributor, description } = req.body;

      await product.update(
        {
          productName,
          distributor,
          description,
        },
        {
          where: { id: req.params.id },
        }
      );
      const edit = await product.findOne({ where: { id: req.params.id } });
      res.status(200).send(edit);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      await category.update(
        {
          categoryName,
        },
        {
          where: { id: req.params.id },
        }
      );
      const edit = await category.findOne({ where: { id: req.params.id } });
      res.status(200).send({
        message: "Update success",
        edit,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  uploadFile: async (req, res) => {
    try {
      let fileUploaded = req.file;
      console.log("controller", fileUploaded);
      await product.update(
        {
          picture: `upload/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getPicture = await product.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getPicture.id,
        picture: getPicture.picture,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  uploadCategory: async (req, res) => {
    try {
      let fileUploaded = req.file;

      await category.update(
        {
          categoryPicture: `upload/${fileUploaded.filename}`,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      const getPicture = await category.findOne({
        where: {
          id: req.params.id,
        },
        raw: true,
      });
      res.status(200).send({
        id: getPicture.id,
        categoryPicture: getPicture.categoryPicture,
      });
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
      const totalRows = await product.count({
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
      const result = await product.findAll({
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

  paginationCategory: async (req, res) => {
    try {
      const { page, limit, search_query, order, sort } = req.query;
      const categorylist_page = parseInt(page) || 0;
      const list_limit = parseInt(limit) || 5;
      const search = search_query || "";
      const offset = list_limit * categorylist_page;
      const orderby = order || "categoryName";
      const direction = sort || "ASC";
      const totalRows = await category.count({
        where: {
          [Op.or]: [
            {
              categoryName: {
                [Op.like]: "%" + search + "%",
              },
            },
            // {
            //   description: {
            //     [Op.like]: "%" + search + "%",
            //   },
            // },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limit);
      const result = await category.findAll({
        // include: [
        //   {
        //     model: cart,
        //     attributes: ["id"],
        //   },
        // ],
        where: {
          [Op.or]: [
            {
              categoryName: {
                [Op.like]: "%" + search + "%",
              },
            },
            // {
            //   description: {
            //     [Op.like]: "%" + search + "%",
            //   },
            // },
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
        page: categorylist_page,
        limit: list_limit,
        totalRows: totalRows,
        totalPage: totalPage,
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  createPrice: async (req, res) => {
    try {
      const { productPrice, startDate, endDate, ProductId, AdminId } = req.body;
      await price.create({
        productPrice,
        startDate,
        endDate,
        ProductId,
        AdminId,
      });
      res.status(200).send({
        message: "Success Added",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  createMultiCategory: async (req, res) => {
    try {
      const { CategoryId, ProductId } = req.body;
      await productCategory.create({
        CategoryId,
        ProductId,
      });
      res.status(200).send({
        message: "Success added",
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findMultiCategory: async (req, res) => {
    try {
      const multiCategory = await productCategory.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).send(multiCategory);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  notDiscountItem: async (req, res) => {
    try {
      const { discPrice } = req.body;
      const discounts = await price.update(
        {
          isDisc: 0,
        },
        {
          where: {
            productPrice: {
              [Op.lt]: 50000,
            },
          },
        }
      );
      res.status(200).send(discounts);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  discountItem: async (req, res) => {
    try {
      const { discPrice } = req.body;
      const discounts = await price.update(
        {
          isDisc: 1,
          DiscountId: 1,
        },
        {
          where: {
            productPrice: {
              [Op.gte]: 50000,
            },
          },
        }
      );

      const disc = await price.findAll({
        // attributes: [
        //   "productPrice"
        // ],
        where: {
          isDisc: 1,
        },
        include: [{ model: discount }],
        raw: true,
      });

      const priceOne = disc.map((item) => item.productPrice);
      const priceTwo = disc.map((item) => item["Discount.nominal"]);

      let finalDisc = priceOne.map((item, index) => {
        return item - priceTwo[index];
      });

      for (let i = 0; i < finalDisc.length; i++) {
        await price.update(
          {
            discPrice: finalDisc[i],
          },
          {
            where: {
              id: disc[i].id,
            },
          }
        );
      }
      res.status(200).send({
        disc,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findDiscount: async (req, res) => {
    try {
      const list = await discount.findOne({
        where: {
          id: 1,
        },
      });
      res.status(200).send(list);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  findAllDiscount: async (req, res) => {
    try {
      const list = await discount.findAll({});
      res.status(200).send(list);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  },
};
