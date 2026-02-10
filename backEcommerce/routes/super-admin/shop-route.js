const router = require("express").Router();
const {createShop, getMyShops, getShop, updateShop, addOwner, deleteShop
    ,removeUserFromShop, addAdmin} = require("../../controllers/super-admin/shop.controller");


router.post("/add", createShop);
router.post("", getMyShops);
router.post("", getShop);
router.post("", updateShop);
router.post("", addOwner);
router.post("", deleteShop);
router.post("", removeUserFromShop);
router.post("", addAdmin);

module.exports = router;