import mongoose from "mongoose";

const deletedBlogSchema = new mongoose.Schema({
    blogId: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: String,
    content: String,
    author: String,
    deletedAt: { type: Date, default: Date.now }
});

export default mongoose.model("DeletedBlog", deletedBlogSchema);
