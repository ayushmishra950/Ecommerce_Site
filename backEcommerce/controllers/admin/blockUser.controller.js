const ShopBlockedUser = require("../../models/blockUser.model");

const blockCustomer = async (req, res) => {
  try {
    const { shopId, userId, reason } = req.body;

    const block = await ShopBlockedUser.create({
      shop: shopId,
      user: userId,
      reason,
      blockedBy: req.user.id,
    });

    res.status(200).json({
      success: true,
      message: "Customer blocked successfully",
      block,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const unblockCustomer = async (req, res) => {
  try {
    const { shopId, userId } = req.body;

    await ShopBlockedUser.findOneAndDelete({
      shop: shopId,
      user: userId,
    });

    res.status(200).json({
      success: true,
      message: "Customer unblocked",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {blockCustomer, unblockCustomer}
