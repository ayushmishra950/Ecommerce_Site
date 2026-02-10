const mongoose = require("mongoose");
const Shop = require("../../models/shop.model");


const createShop = async (req, res) => {
  try {
    const {
      name,
      description,
      email,
      phone,
      address,
      currency,
      timezone,
      owners,
      createdBy, 
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(409).json({
        success: false,
        message: "Shop with this email already exists",
      });
    }

    const shop = await Shop.create({
      name,
      description,
      email,
      phone,
      address,
      currency,
      timezone,
      createdBy: createdBy,
      owners: owners,
    });

    res.status(201).json({
      success: true,
      message: "Shop created successfully",
      data: shop,
    });
  } catch (error) {
    console.error("Create Shop Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getMyShops = async (req, res) => {
  try {
    const userId = req.user._id;

    const shops = await Shop.find({
      $or: [{ owners: userId }, { admins: userId }],
      isDeleted: false,
    })
      .populate("owners", "name email")
      .populate("admins", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: shops,
    });
  } catch (error) {
    console.error("Get Shops Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const getShop = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    const query = mongoose.Types.ObjectId.isValid(idOrSlug)
      ? { _id: idOrSlug }
      : { slug: idOrSlug };

    const shop = await Shop.findOne({ ...query, isDeleted: false })
      .populate("owners", "name email")
      .populate("admins", "name email");

    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    res.status(200).json({
      success: true,
      data: shop,
    });
  } catch (error) {
    console.error("Get Shop Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const updateShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const userId = req.user._id;

    const shop = await Shop.findById(shopId);
    if (!shop || shop.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    if (!shop.owners.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "Only owners can update shop",
      });
    }

    Object.assign(shop, req.body);
    await shop.save();

    res.status(200).json({
      success: true,
      message: "Shop updated successfully",
      data: shop,
    });
  } catch (error) {
    console.error("Update Shop Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const addOwner = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { ownerId } = req.body;
    const userId = req.user._id;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    if (!shop.owners.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "Only owners can add new owner",
      });
    }

    if (shop.owners.includes(ownerId)) {
      return res.status(400).json({
        success: false,
        message: "User already an owner",
      });
    }

    shop.owners.push(ownerId);
    await shop.save();

    res.status(200).json({
      success: true,
      message: "Owner added successfully",
    });
  } catch (error) {
    console.error("Add Owner Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const addAdmin = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { adminId } = req.body;
    const userId = req.user._id;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    if (!shop.owners.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "Only owners can add admins",
      });
    }

    if (shop.admins.includes(adminId)) {
      return res.status(400).json({
        success: false,
        message: "User already admin",
      });
    }

    shop.admins.push(adminId);
    await shop.save();

    res.status(200).json({
      success: true,
      message: "Admin added successfully",
    });
  } catch (error) {
    console.error("Add Admin Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const removeUserFromShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { userIdToRemove, role } = req.body;
    const userId = req.user._id;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    if (!shop.owners.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "Only owners can remove users",
      });
    }

    if (role === "OWNER") {
      if (shop.owners.length === 1) {
        return res.status(400).json({
          success: false,
          message: "At least one owner required",
        });
      }
      shop.owners.pull(userIdToRemove);
    } else if (role === "ADMIN") {
      shop.admins.pull(userIdToRemove);
    }

    await shop.save();

    res.status(200).json({
      success: true,
      message: "User removed successfully",
    });
  } catch (error) {
    console.error("Remove User Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const userId = req.user._id;

    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({
        success: false,
        message: "Shop not found",
      });
    }

    if (!shop.owners.includes(userId)) {
      return res.status(403).json({
        success: false,
        message: "Only owners can delete shop",
      });
    }

    shop.isDeleted = true;
    shop.isActive = false;
    await shop.save();

    res.status(200).json({
      success: true,
      message: "Shop deleted successfully",
    });
  } catch (error) {
    console.error("Delete Shop Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {createShop, getMyShops, getShop, updateShop, addOwner, deleteShop
    ,removeUserFromShop, addAdmin
}