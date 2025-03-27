const express = require("express");
const router = express.Router();
const debugController = require("../controllers/debugController");

// ✅ Route for debugging code
router.post("/debug", debugController.debugCode);

module.exports = router;
