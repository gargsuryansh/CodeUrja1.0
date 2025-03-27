const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const apiLimiter = require("../middleware/rateLimitMiddleware");

router.get("/protected", authenticateJWT, (req, res) => {
    res.json({ message: "You have accessed a protected route!", user: req.user });
});

router.get("/public", apiLimiter, (req, res) => {
    res.json({ message: "This is a public rate-limited route!" });
});

module.exports = router;