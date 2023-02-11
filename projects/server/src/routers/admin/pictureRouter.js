const router = require("express").Router();
const { pictureController } = require("../../controllers/index");
const { multerUpload } = require("../../middleware/multer");

router.post(
  "/single-uploaded-picture",
  multerUpload.single("file"),
  pictureController.uploadFile
);

module.exports = router;
