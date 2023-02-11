const router = require("express").Router();
const { promoController } = require("../../controllers/index");

router.post("/create", promoController.createDiscount);
router.get("/find", promoController.findDiscount)
router.patch("/update/:id", promoController.updatePrice)


module.exports = router;
