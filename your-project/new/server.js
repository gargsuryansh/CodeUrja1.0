require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/authDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
    aadhaar: { type: String, unique: true, required: true },
    mobile: { type: String, required: true },
    password: { type: String }
});
const User = mongoose.model('User', UserSchema);

// Generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

let otpStorage = {}; // Temporary store OTPs

// ➤ Step 1: Send OTP for Aadhaar verification
app.post('/send-otp', async (req, res) => {
    const { aadhaar, mobile } = req.body;

    if (!aadhaar || !mobile) return res.status(400).json({ message: "Aadhaar & Mobile required" });

    const otp = generateOTP();
    otpStorage[mobile] = otp; // Store OTP temporarily

    console.log(`OTP for ${mobile}: ${otp}`); // Debugging (Use an actual SMS API here)

    return res.json({ message: "OTP sent successfully!" });
});

// ➤ Step 2: Verify OTP & Create Account
app.post('/verify-otp', async (req, res) => {
    const { aadhaar, mobile, otp, password } = req.body;

    if (otpStorage[mobile] !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ aadhaar, mobile, password: hashedPassword });
    await newUser.save();

    delete otpStorage[mobile]; // Remove OTP after use

    return res.json({ message: "Account created successfully!" });
});

// ➤ Step 3: Login with Aadhaar & Password
app.post('/login', async (req, res) => {
    const { aadhaar, password } = req.body;

    const user = await User.findOne({ aadhaar });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ aadhaar: user.aadhaar }, "secretkey", { expiresIn: "1h" });

    return res.json({ message: "Login successful!", token });
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
