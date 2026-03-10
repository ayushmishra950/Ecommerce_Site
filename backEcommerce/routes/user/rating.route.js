const express = require("express");
const router = express.Router();
const { addRating, getProductRatings, getShopRatings, updateRating, deleteRating } = require("../../controllers/user/rating.controller");

router.post("/add", addRating);
router.get("/product", getProductRatings);
router.get("/shop/:shopId", getShopRatings);
router.put("/update/:id", updateRating);
router.delete("/delete/:id", deleteRating);

module.exports = router;