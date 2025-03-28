import express from "express";
// also  can import middelewhere for auth
import {  } from "../controllers/blog.js";
// Create a new router instance
const router = express.Router();

// Define the routes
router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.get("/", (req, res) => {
  res.send("Hello World!");
});



export default router;