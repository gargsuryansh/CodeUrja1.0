import express from "express";

import { buyProduct, createProduct, deleteProduct, getShopcard, getShopHero, updateProduct, getShop } from "../controllers/ecommController.js";

const router = express.Router();
// router.get("/", getShop);
router.post("/create/shop/hero", getShopHero);
router.post("/create/shop/card", getShopcard);      /* */

router.post("/add", createProduct);
router.post('/buy/:id', buyProduct);

router.put("/update/:id", updateProduct); 
router.delete("/delete/:id", deleteProduct);

export default router;