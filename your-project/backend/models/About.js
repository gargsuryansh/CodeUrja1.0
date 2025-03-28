import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
    mission: String,
    vision: String,
    team: [String],
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export default mongoose.model("About", aboutSchema);
