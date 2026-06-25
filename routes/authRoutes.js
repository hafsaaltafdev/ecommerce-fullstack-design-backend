import express from "express";
import { signupUser, loginUser, getProfile } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;