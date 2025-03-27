// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     price: Number,
//     category: String,
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// export default mongoose.model("Product", productSchema);


import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 }, // Optional stock field
    image: { type: String }, // Store image URL if needed
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
