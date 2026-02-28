const router = require("express").Router();
const {getWishlist, addToWishlist, removeFromWishlist, clearWishlist} = require("../../controllers/user/wishlist.controller");



router.get("/get", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove/:productId", removeFromWishlist);
router.delete("/clear", clearWishlist);

module.exports = router;