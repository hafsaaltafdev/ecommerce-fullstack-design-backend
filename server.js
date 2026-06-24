import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(async (req, res, next) => {
  await connectDB(); // ← ye add karo
  next();
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, ()=>{
//     console.log(`Server running on port ${PORT}`);
    
// })

export default app;