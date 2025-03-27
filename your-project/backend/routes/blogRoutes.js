import express from "express";
import { createBlog, deleteBlog, getBlogCard, getBlogHero, updateBlog } from "../controllers/blogControllers.js";



const router = express.Router();

router.get("/create/hero", getBlogHero);
router.get("/create/card", getBlogCard);

router.post("/create", createBlog);
router.put("/update/:id", updateBlog);  
router.delete("/delete/:id", deleteBlog);


export default router;
