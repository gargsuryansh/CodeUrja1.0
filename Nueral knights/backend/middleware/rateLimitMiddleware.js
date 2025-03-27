const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000, // Convert minutes to ms
    max: process.env.RATE_LIMIT_MAX,
    message: "Too many requests from this IP, please try again later.",
});

module.exports = apiLimiter;