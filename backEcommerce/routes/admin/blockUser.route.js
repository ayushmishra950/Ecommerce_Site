const router = require("express").Router();
const {toggleBlockCustomer, getBlockList} = require("../../controllers/admin/blockUser.controller");

router.patch("/toggle", toggleBlockCustomer);
router.get("/get", getBlockList);

module.exports = router;