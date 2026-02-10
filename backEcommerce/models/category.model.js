const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    description: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
    product : [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    }],
     shopId:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"Shop",
          required:true
        }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
