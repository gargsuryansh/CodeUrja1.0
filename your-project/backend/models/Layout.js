import mongoose from "mongoose";

const layoutSchema = new mongoose.Schema({
    type: { type: String, required: true, enum: ["hero", "card"] }, 
    heading: String,
    subHead: String,
    style: mongoose.Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Layout", layoutSchema);
