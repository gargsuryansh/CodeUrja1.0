import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import tenantMiddleware from "./middleware/tenantMiddleware.js";

// Import Routes
// import authRoutes from "./routes/authRoutes.js";
// import homeRoutes from "./routes/homeRoutes.js";
// import aboutRoutes from "./routes/aboutRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import ecommRoutes from "./routes/ecommRoutes.js";
// import productRoutes from "./routes/productRoutes.js";  
import websiteRoutes from "./routes/website.routes.js";

import aboutRoutes from "./routes/about.routes.js";


// import { sendEnquiry } from "./controllers/contactController.js";
// import { get } from "mongoose";
// import { getHeroLayout } from "./utils/api.js";
// import { getHeroSection } from "./controllers/homeController.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// app.use(tenantMiddleware); // Multi-Tenant Handling

// Routes
// app.use("/api/auth", authRoutes)

app.use("/api/website", websiteRoutes);

app.use("/api/blog", blogRoutes);

app.use("api/website", websiteRoutes);
app.use("api/blog", blogRoutes);
app.use("api/ecom", ecommRoutes)



// Connect Database & Start Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
