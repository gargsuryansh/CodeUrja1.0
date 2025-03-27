// import mongoose from "mongoose";

// const blogSchema = new mongoose.Schema({
//     title: String,
//     content: String,
//     author: String,
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// export default mongoose.model("Blog", blogSchema);


import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }, 
    deletedAt: { type: Date }
});

export default mongoose.model("Blog", blogSchema);
