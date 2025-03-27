// import Product from "../models/Product.js";
// import { getShopHeroLayout } from "../utils/api.js";

// export const createProduct = async (req, res) => {
//     try {
//         const { name, description, price, category } = req.body;
//         const newProduct = new Product({ name, description, price, category });
//         await newProduct.save();
//         res.json({ message: "Product saved successfully!", data: newProduct });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };


// export const updateProduct = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { name, description, price, category } = req.body;

//         const updatedProduct = await Product.findByIdAndUpdate(
//             id,
//             { name, description, price, category },
//             { new: true, runValidators: true }
//         );

//         if (!updatedProduct) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         res.status(200).json({ message: "Product updated successfully!", data: updatedProduct });
//     } catch (error) {
//         console.error("Error updating product:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };

// export const deleteProduct = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedProduct = await Product.findByIdAndDelete(id);
//         if (!deletedProduct) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         res.status(200).json({ message: "Product deleted successfully!" });
//     } catch (error) {
//         console.error("Error deleting product:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };





// export const getShopHero = async (req, res) => {
//     try {
//         const { heading, subHead, image, cta, style } = req.body;

//         if (!heading || !subHead) {
//             return res.status(400).json({ error: "Heading and subhead are required fields." });
//         }

//         const shopHero = await getShopHeroLayout({ heading, subhead: subHead, image, cta, style });
//         res.status(200).json({ message: "Hero section generated successfully", 
//             component: shopHero
//     });
//     } catch (error) {
//         console.error("Error generating hero section:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };



// export const getShopcard = async (req, res) => {
//     try {
//         const { name, description, price, category } = req.body;

//         if (!name || !description || !price || !category) {
//             return res.status(400).json({ error: "All fields are required." });
//         }

//         const product = await getProductCard({ name, description, price, category });
//         res.status(200).json({ message: "Product card generated successfully", component: product });

//     } catch (error) {
//         console.error("Error saving product:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };



// export const buyProduct = async (req, res) => {
//     try {
//         const pid = req.params.id;

//         // Find the product by ID
//         const product = await Product.findById(pid);

//         if (!product) {
//             return res.status(404).json({ error: "Product not found" });
//         }

//         // Check if the product is in stock
//         // if (product.stock <= 0) {
//         //     return res.status(400).json({ error: "Product is out of stock" });
//         // }

//         // Decrease the stock by 1
//         // product.stock -= 1;
//         await product.save();

//         // Respond with a success message
//         res.status(200).json({ message: "Product purchased successfully!", data: product });
//     } catch (error) {
//         console.error("Error purchasing product:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };


// export const getShop = async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.status(200).json({ data: products });
//     } catch (error) {
//         console.error("Error getting products:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };




import Product from "../models/Product.js";
import { getShopHeroLayout, getProductCardLayout } from "../utils/api.js";

/**
 * Create and store a new product in MongoDB
 */
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, image } = req.body;

        const newProduct = new Product({ name, description, price, category, stock, image });
        await newProduct.save();

        res.json({ message: "Product saved successfully!", data: newProduct });
    } catch (error) {
        console.error("Error saving product:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Update an existing product in MongoDB
 */
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock, image } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, category, stock, image },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully!", data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Delete a product from MongoDB
 */
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Generate and store the Shop Hero section
 */
export const getShopHero = async (req, res) => {
    try {
        const { heading, subHead, image, cta, style } = req.body;

        if (!heading || !subHead) {
            return res.status(400).json({ error: "Heading and subhead are required fields." });
        }

        const shopHero = await getShopHeroLayout({ heading, subhead: subHead, image, cta, style });

        // Store in MongoDB (Optional, create a new ShopHero model if needed)
        // const newShopHero = new ShopHero({ heading, subHead, image, cta, style });
        // await newShopHero.save();

        res.status(200).json({ message: "Hero section generated successfully", component: shopHero });
    } catch (error) {
        console.error("Error generating hero section:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Generate and return a Product Card
 */
export const getShopcard = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!name || !description || !price || !category) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const product = await getProductCard({ name, description, price, category });

        res.status(200).json({ message: "Product card generated successfully", component: product });
    } catch (error) {
        console.error("Error generating product card:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Buy a product (decrease stock)
 */
export const buyProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the product by ID
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if the product is in stock
        if (product.stock <= 0) {
            return res.status(400).json({ error: "Product is out of stock" });
        }

        // Decrease the stock by 1
        product.stock -= 1;
        await product.save();

        res.status(200).json({ message: "Product purchased successfully!", data: product });
    } catch (error) {
        console.error("Error purchasing product:", error);
        res.status(500).json({ error: "Server error" });
    }
};

/**
 * Get all products from MongoDB
 */
export const getShop = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ data: products });
    } catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: "Server error" });
    }
};
