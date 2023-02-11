const userRouter = require("./user/userRouter");
const adminRouter = require("./admin/adminRouter");
const addressRouter = require("./user/addressRouter");
const branchRouter = require("./admin/branchRouter");
const productRouter = require("./admin/productRouter");
const pictureRouter = require("./admin/pictureRouter");
const cartRouter = require("./user/cartRouter");
const inventoryRouter = require("./admin/inventoryRouter");
const transactionRouter = require("./user/transactionRouter");
const promoRouter = require("./admin/promoRouter");

module.exports = {
  userRouter,
  adminRouter,
  addressRouter,
  branchRouter,
  productRouter,
  pictureRouter,
  cartRouter,
  inventoryRouter,
  transactionRouter,
  promoRouter,
};
