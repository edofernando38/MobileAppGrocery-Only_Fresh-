const router = require("express").Router();
const { userController } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");
const { verifyToken, checkRole } = require("../../middleware/user");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/verification", verifyToken, userController.verification);
router.post("/changeotp", userController.changeOtp);
router.post("/forgotPassword", userController.sendEmailForgotPass);
router.post("/updatePass", verifyToken, userController.changePassword);
router.post(
  "/single-uploaded/:id",
  multerUpload.single("file"),
  userController.uploadFile
);
router.patch("/update/:id", userController.update);
router.patch("/updatePassword/:id", userController.updatePass);
router.patch("/updateEmail/:id", userController.updateEmail);
router.get("/getAll", userController.findAll);
router.get("/byId/:id", userController.findById);
router.get("/keepLogin", userController.keepLogin);
router.get("/available", userController.findEmail);
router.get("/availableNumber", userController.findPhoneNumber);

module.exports = router;
