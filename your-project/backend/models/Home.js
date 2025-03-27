// import mongoose from "mongoose";

// const homeSchema = new mongoose.Schema({
//     heroText: String,
//     whyChooseUs: [String],
//     faqs: [String],
//     footer: String,
//     createdAt: { 
//         type: Date, 
//         default: Date.now 
//     }
// });

// export default mongoose.model("Home", homeSchema);


import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
    heading: String,
    subHead: String,
    image: String,
    cta: String,
    style: String
});

const whyChooseUsSchema = new mongoose.Schema({
    reasons: [String], // List of reasons
    style: String
});

const faqSchema = new mongoose.Schema({
    question: String,
    answer: String
});

const footerSchema = new mongoose.Schema({
    title: String,
    links: [String]
});

const homeSchema = new mongoose.Schema({
    heroComponent: heroSchema,
    whyChooseUsComponent: whyChooseUsSchema,
    faqComponent: [faqSchema], // Array of FAQs
    footerComponent: footerSchema,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Home", homeSchema);
