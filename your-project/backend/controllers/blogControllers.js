import Blog from "../models/Blog.js";
import { getBlogCardLayout, getBlogHeroLayout } from "../utils/api.js";

export const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const newBlog = new Blog({ title, content, author });
        await newBlog.save();
        res.json({ message: "Blog saved successfully!", data: newBlog });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};


export const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.status(200).json({ message: "Blog updated successfully!", data: updatedBlog });
    } catch (error) {
        console.error("Error updating blog:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Delete Blog
import DeletedBlog from "../models/DeletedBlog.js";
export const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        const deletedBlog = new DeletedBlog({
            blogId: blog._id,
            title: blog.title,
            content: blog.content,
            author: blog.author
        });

        await deletedBlog.save();
        await Blog.findByIdAndDelete(id);

        res.status(200).json({ message: "Blog deleted successfully!" });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Server error" });
    }
};



export const getBlogHero = async (req, res) => {
    try {
        const { heading, subHead, style } = req.body;
        const layout = await getBlogHeroLayout({ heading, subHead, style });

        // const newLayout = new Layout({ type: "hero", heading, subHead, style });
        // await newLayout.save();

        res.json({ layout });
    } catch (error) {
        console.error("Error getting blog hero layout:", error);
        res.status(500).json({ error: "Server error" });
    }
}



export const getBlogCard = async (req, res) => {
    try {
        const { style } = req.body;
        const layout = await getBlogCardLayout({ style });

        // const newLayout = new Layout({ type: "card", style });
        // await newLayout.save();

        res.json({ layout });
    } catch (error) {
        console.error("Error getting blog card layout:", error);
        res.status(500).json({ error: "Server error" });
    }
}

