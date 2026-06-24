import express from "express";
import { createProduct, getProducts, getOneProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// for users
router.get("/", getProducts);
router.get("/:id", getOneProduct);

// for admin only
router.post("/add", authMiddleware, adminMiddleware, createProduct);
router.put("/update/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;