import mongoose from "mongoose";

const deletedProductSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    image: String,
    deletedAt: { type: Date, default: Date.now }
});

export default mongoose.model("DeletedProduct", deletedProductSchema);
