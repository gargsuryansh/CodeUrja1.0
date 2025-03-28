import express from "express";



// import heroRoutes from "./hero.routes.js";
import { getFAQSection, getFooterSection, getWhyChooseUsSection, getHeroSection, getHomePage } from "../controllers/homeController.js";


// import aboutRoutes from "./about.routes.js";
// import contactRoutes from "./contact.routes.js";


const router = express.Router();

router.get("/user/home", getHomePage)
// router.post("/create/home", heroRoutes)
router.post("/create/home/hero", getHeroSection)
router.post("/create/home/why", getWhyChooseUsSection)
router.post("/create/home/faq", getFAQSection)
router.post("/create/home/footer", getFooterSection)

// router.get("/update/home", UpdateHome)
// router.get("/:tenetid/create/about", aboutRoutes)
// router.get("/:tenetid/create/contact", contactRoutes)

export default router;




