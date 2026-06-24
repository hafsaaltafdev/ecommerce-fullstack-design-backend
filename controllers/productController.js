import Product from "../models/Product.js";

// create product
export const createProduct = async (req, res) => {
  try {
    const { name, price, image, description, category, stock } = req.body;
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created successfully", product })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};


// Get All Products
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    let filter = {};
    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET single product
export const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};