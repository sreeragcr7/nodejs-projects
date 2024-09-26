const Product = require("../models/product");

//get procucts
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get product
const getProduct = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await Product.findById(pid);

    if (!product) {
      return res.status(404).json({ message: "product dont exixt!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//crete product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update product
const updateProduct = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await Product.findByIdAndUpdate(pid, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ Message: "product not found !" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const pid = req.params.id;
    const product = await Product.findByIdAndDelete(pid);
    if (!product) {
      return res.status(404).json({ message: "product dosent exist !" });
    }
    res.status(200).json({ message: "product deleted successfully !" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
