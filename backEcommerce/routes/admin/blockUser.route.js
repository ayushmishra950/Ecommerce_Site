const router = require("express").Router();
const {blockCustomer, unblockCustomer} = require("../../controllers/admin/blockUser.controller");

router.post("/add", blockCustomer);
router.patch("/update", unblockCustomer);

module.exports = router;