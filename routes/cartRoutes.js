import express from "express";

import {
  addToCart,
  getCart,
  removeItem,
  clearCart,
  updateQuantity,
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/clear", authMiddleware, clearCart);
router.delete("/:productId", authMiddleware, removeItem);
router.post("/update", authMiddleware, updateQuantity);

export default router;
