const router = require("express").Router();
const { transactionController } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");

router.post("/create/:id", transactionController.create);
router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  transactionController.uploadFile
);
router.patch("/setOrder/:id", transactionController.setProcess);
router.patch("/setDelivery/:id", transactionController.setDelivery)
router.patch("/setDone/:id", transactionController.setDone)
router.patch("/setCancelled/:id", transactionController.setCancelled)
router.get("/findById/:id", transactionController.findAllById);
router.get("/list/:id", transactionController.findById);
router.get("/listProduct/:id", transactionController.findProductById);
router.get("/listAll/:AdminId", transactionController.findAllByAdmin);
router.get("/listCancelled/:AdminId", transactionController.findCancelled);
router.get("/listWaitingPayment/:AdminId", transactionController.findWaitingPayment);
router.get("/listConfirmPayment/:AdminId", transactionController.findConfirmPayment);
router.get("/listOnProcess/:AdminId", transactionController.findOnProcess);
router.get("/listDelivery/:AdminId", transactionController.findDelivery);
router.get("/listDone/:AdminId", transactionController.findDone);
router.get("/salesDepok", transactionController.findSalesDepok);
router.get("/salesJaksel", transactionController.findSalesJaksel);
router.get("/salesJaktim", transactionController.findSalesJaktim);
router.get("/total/:BranchId", transactionController.totalSales)
router.get("/totalAll", transactionController.totalSalesAll)
router.get("/pagTransaction", transactionController.paginationTransaction);

module.exports = router;
