const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const CustomAIPError = require("../errors");

const createProduct = (req, res) => {
  res.send(" create product");
};

const getAllProducts = async (req, res) => {
  const product = await Product.find({});
  res.status(StatusCodes.OK).json({ product, count: product.length });
};

const updateProduct = async (req, res) => {
  res.send(" update products");
};

const deleteProduct = async (req, res) => {
  res.send(" delete products");
};

const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomAIPError.NotFoundError(`No product with id : ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
};

const uploadImage = async (req, res) => {
  res.send("upload image");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
