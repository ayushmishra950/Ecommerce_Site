const router = require("express").Router();
const {getWishlist, toggleWishlist,allProductMoveToCart,moveToCart, clearWishlist} = require("../../controllers/user/wishlist.controller");



router.get("/get", getWishlist);
router.put("/toggle", toggleWishlist)
router.delete("/clear", clearWishlist);
router.patch("/movetocart", moveToCart);
router.patch("/allmovetocart", allProductMoveToCart)

module.exports = router;