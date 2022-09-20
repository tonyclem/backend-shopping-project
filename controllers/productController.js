const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomAIPError = require("../errors");

const getAllProducts = async (req, res) => {
  const product = await Product.find({});
  res.status(StatusCodes.OK).json({ product, count: product.length });
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomAIPError.NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

module.exports = {
  getAllProducts,
  getSingleProduct,
};
