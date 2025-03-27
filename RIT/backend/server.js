require("dotenv").config();
const express = require("express");
const debugRoutes = require("./routes/debugRoutes");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", debugRoutes);

// Health check
app.get("/", (req, res) => {
    res.json({
        status: "running",
        message: "AI Debugging Assistant API",
        endpoints: {
            debug: "POST /api/debug",
            languages: ["javascript", "python"]
        }
    });
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: "Something broke!",
        details: err.message 
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`Supported languages: JavaScript, Python`);
});