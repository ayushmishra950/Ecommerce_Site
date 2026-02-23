const Wishlist = require("../../models/wishlist.model");
const Product = require("../../models/product.model");
const User = require("../../models/user.model");

/**
 * @desc    Get logged-in user's wishlist
 * @route   GET /api/wishlist
 * @access  Private (User)
 */
const getWishlist = async (req, res) => {
    const {userId} = req.query;
  try {
    const wishlist = await Wishlist.find({ user: userId })
      .populate("product");

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wishlist",
      error: error.message,
    });
  }
};

/**
 * @desc    Add product to wishlist
 * @route   POST /api/wishlist/:productId
 * @access  Private (User)
 */
const addToWishlist = async (req, res) => {
  const {userId, productId} = req.body;
  console.log(req.body)

  try {
    const user = await User.findOne({_id:userId});
    console.log("usr", user);
    if(!user)return res.status(404).json({message:"user not found."})
    const product = await Product.findById(productId);
    console.log("product", product)
    if (!product || !product.isActive) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existing = await Wishlist.findOne({
      user: userId,
      product: productId,
    });
   console.log("exisiting", existing)
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    const wishlistItem = await Wishlist.create({
      user: userId,
      product: productId,
    });
    console.log(wishlistItem)
   user.wishlist.push(wishlistItem?._id);
  await user?.save();
    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      data: wishlistItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add to wishlist",
      error: error.message,
    });
  }
};

/**
 * @desc    Remove product from wishlist
 * @route   DELETE /api/wishlist/:productId
 * @access  Private (User)
 */
const removeFromWishlist = async (req, res) => {
  const {userId, productId} = req.query;

  try {
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message:"user not found."});

    const item = await Wishlist.findOneAndDelete({
      user: userId,
      product: productId,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in wishlist",
      });
    }

   if (item?._id) {
  user.wishlist.pull(item._id);
  await user.save();
}
    res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove from wishlist",
      error: error.message,
    });
  }
};

/**
 * @desc    Clear wishlist
 * @route   DELETE /api/wishlist
 * @access  Private (User)
 */
const clearWishlist = async (req, res) => {
    const {userId} = req.query;
  try {
    await Wishlist.deleteMany({ user: userId });

    const user = await User.findById(userId);
    if(user){
    user.wishlist = [];
    await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to clear wishlist",
      error: error.message,
    });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
};
