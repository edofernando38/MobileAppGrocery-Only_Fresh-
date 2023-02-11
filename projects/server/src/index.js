require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const db = require("./models");
const bearerToken = require("express-bearer-token");
const path = require("path");
const app = express();
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.use(
  "/upload",
  express.static(path.join(__dirname, "/upload")),
  // fileUpload({
  //   createParentPath: true,
  //   limits: {
  //     fileSize: 1024 * 1024, // 1 MB
  //   },
  //   abortOnLimit: true,
  // })
);
// app.use(
//   fileUpload({
//     createParentPath: true,
//     limits: {
//       fileSize: 1024 * 1024, // 1 MB
//     },
//     abortOnLimit: true,
//   })
// );
app.use(bearerToken());

// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//         process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );

//#region API ROUTES
const {
  userRouter,
  addressRouter,
  adminRouter,
  branchRouter,
  productRouter,
  pictureRouter,
  cartRouter,
  inventoryRouter,
  transactionRouter,
  promoRouter,
} = require("./routers");

// ===========================
// NOTE : Add your routes here
app.use("/user", userRouter);
app.use("/address", addressRouter);
app.use("/admin", adminRouter);
app.use("/branch", branchRouter);
app.use("/product", productRouter);
app.use("/picture", pictureRouter);
app.use("/cart", cartRouter);
app.use("/inventory", inventoryRouter);
app.use("/transaction", transactionRouter);
app.use("/promo", promoRouter);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, People Fresh!",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    // db.sequelize.sync({ alter: true });
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});