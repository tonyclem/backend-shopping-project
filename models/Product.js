const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "Name can not be more the 100 characters"],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: true,
      maxlength: [1000, "Name can not be more the 100 characters"],
    },
    image: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Men Suits",
        "Lady Suits",
        "Men Pants",
        "Women Pants",
        "Men Shoes",
        "Women Shoes",
      ],
    },
    company: { type: String, required: true },
    colors: { type: [String], required: true },
    features: { type: Boolean },
    freeShipping: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
