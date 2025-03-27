import { getHeroLayout, getFAQLayout,  getWhyChooseUsLayout, getFooterLayout } from "../utils/api.js";


export const getHeroSection = async (req, res) => {
    try {
        const { heading, subHead, image, cta, style } = req.body;

        if (!heading || !subHead) {
            return res.status(400).json({ error: "Heading and subhead are required fields." });
        }

        const heroComponent = await getHeroLayout({ heading, subhead: subHead, image, cta, style });
        
        // giri edit    
        let home = await Home.findOne();
        if (home) {
            home.heroText = heroComponent;
        } 
        else {
            home = new Home({ heroText: heroComponent });
        }

        await home.save();

        res.status(200).json({ message: "Hero section generated successfully", component: heroComponent });
    } catch (error) {
        console.error("Error generating hero section:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const getWhyChooseUsSection = async (req, res) => {
    try {
        const { why1, why2, why3,style } = req.body;

        if (!style) {
            return res.status(400).json({ error: "Style is a required field." });
        }

        const whyChooseUsComponent = await getWhyChooseUsLayout({ why1, why2, why3, style });
        
        // giri edit
        let home = await Home.findOne();
        if (!home) {
            home = new Home({ whyChooseUs: [whyChooseUsComponent] });
        } else {
            home.whyChooseUs = [whyChooseUsComponent];
        }

        await home.save();

        res.status(200).json({ message: "Why Choose Us section generated successfully", component: whyChooseUsComponent });
    } catch (error) {
        console.error("Error generating Why Choose Us section:", error);
        res.status(500).json({ error: "Server error" });
    }
}


// faqs are an array of objects with question and answer fields
export const getFAQSection = async (req, res) => {
    try {
        const { faqs, style } = req.body;

        if (!faqs || !faqs.length || !style) {
            return res.status(400).json({ error: "FAQs are required." });
        }

        const faqComponent = await getFAQLayout(faqs, style);
        
        res.status(200).json({ message: "FAQ section generated successfully", component: faqComponent });
    } catch (error) {
        console.error("Error generating FAQ section:", error);
        res.status(500).json({ error: "Server error" });
    }
}


export const getFooterSection = async (req, res) => {
    
    try {

    if(!req.body.links || !req.body.title) {
        return res.status(400).json({ error: "Links and title are required fields." });
    }

        const { links, title}  = req.body;
        const footerComponent = await getFooterLayout({ links, title });

        res.status(200).json({ message: "Footer section generated successfully", component: footerComponent });
    
    } catch (error) {
        console.error("Error generating footer section:", error);
        res.status(500).json({ error: "Server error" });
    }

}



import Home from "../models/Home.js";

export const updateHomePage = async (req, res) => {
    try {
        const { heroText, whyChooseUs, faqs, footer } = req.body;

        // Validate required fields
        if (!heroText || !whyChooseUs || !faqs || !footer) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Check if Home data exists
        let home = await Home.findOne();
        
        if (!home) {
            // If no home data exists, create a new one
            home = new Home({ heroText, whyChooseUs, faqs, footer });
        } else {
            // Otherwise, update the existing one
            home.heroText = heroText;
            home.whyChooseUs = whyChooseUs;
            home.faqs = faqs;
            home.footer = footer;
        }

        // Save the updated/new data
        await home.save();

        res.status(200).json({ message: "Home page updated successfully", home });
    } catch (error) {
        console.error("Error updating home page:", error);
        res.status(500).json({ error: "Server error" });
    }
};


export const deleteHomePage = async (req, res) => {
    try {
        const { id } = req.params; // Get the ID from URL

        // Check if the document exists
        const home = await Home.findById(id);
        if (!home) {
            return res.status(404).json({ error: "Home section not found" });
        }

        // Delete the document
        await Home.findByIdAndDelete(id);

        res.status(200).json({ message: "Home section deleted successfully" });
    } catch (error) {
        console.error("Error deleting home section:", error);
        res.status(500).json({ error: "Server error" });
    }
};




export const getHomePage = (req, res) => {
    res.json({ message: "Home page data" });
}


// import Home from "../models/Home.js";

// export const updateHomePage = async (req, res) => {
//     try {
//         const { heroComponent, whyChooseUsComponent, faqComponent, footerComponent } = req.body;

//         // Validate required fields
//         if (!heroComponent || !whyChooseUsComponent || !faqComponent || !footerComponent) {
//             return res.status(400).json({ error: "Missing required fields" });
//         }

//         let home = await Home.findOne();

//         if (!home) {
//             home = new Home({ heroComponent, whyChooseUsComponent, faqComponent, footerComponent });
//         } else {
//             home.heroComponent = heroComponent;
//             home.whyChooseUsComponent = whyChooseUsComponent;
//             home.faqComponent = faqComponent;
//             home.footerComponent = footerComponent;
//         }

//         await home.save();
//         res.status(200).json({ message: "Home page updated successfully", home });
//     } catch (error) {
//         console.error("Error updating home page:", error);
//         res.status(500).json({ error: "Server error" });
//     }
// };
