const ShopBlockedUser = require("../../models/blockUser.model");
const Admin = require("../../models/admin.model");


const toggleBlockCustomer = async (req, res) => {
  try {
    const { shopId, userId, reason } = req.body;

    // Check if user is already blocked
    const existingBlock = await ShopBlockedUser.findOne({
      shop: shopId,
      user: userId,
    });

    if (existingBlock) {
      // User is blocked → unblock
      await ShopBlockedUser.findOneAndDelete({
        shop: shopId,
        user: userId,
      });

      return res.status(200).json({
        success: true,
        action: "unblocked",
        message: `The customer with ID '${userId}' has been successfully removed from the blocked list for shop '${shopId}'.`,
      });
    } else {
      // User is not blocked → block
      const block = await ShopBlockedUser.create({
        shop: shopId,
        user: userId,
        reason,
        blockedBy: req.user.id,
      });

      return res.status(200).json({
        success: true,
        action: "blocked",
        message: `The customer with ID '${userId}' has been successfully added to the blocked list for shop '${shopId}'.`,
        block,
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: `An error occurred while processing the request: ${error.message}`
    });
  }
};

const getBlockList = async(req, res) => {
   try{
         const id = req.user.id;
         const admin = await Admin.findOne({_id:id});
         if(!admin) return res.status(404).json({message:"Admin Not Found."})

         const blockList  = await ShopBlockedUser.find({shop:admin?.shopId, isBlocked:true});
         res.status(200).json({message:"block list get successfully.", blockList})
   }
   catch (error) {
    res.status(500).json({ message: error.message });
  }
}


module.exports = {toggleBlockCustomer, getBlockList}
