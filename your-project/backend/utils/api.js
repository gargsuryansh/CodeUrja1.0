import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({ apiKey: "AIzaSyA5cG6jL9x_CDvK_S9OyCuE8VwbTCUyH1Y" });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "i want to make some elements in a next js 14 application i am giving you the details give me the code for that elemet, according to the details i am giving you, i just wnat to the code do not give event an extra discription above or below the code snippet, discription: headline: we sell best carptet, subhead: we have the best carpet in the market, button: buy now, CTA link: /buy-now, image: https://unsplash.com/photos/glacier-sits-atop-an-arid-rocky-landscape-h-huws0YRo8, background color: #f5f5f5, text color: #000000 also give me use client string at the top of the file if it is a client side code always give the code in js and do not install any npm package in it",
  });
  console.log(response.text);
}
// await main();



export const getHeroLayout = async ({ heading, subhead, image, cta, style }) => {
    let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;
    
    prompt += ` The component should include:
    - Headline: ${heading}
    - Subhead: ${subhead}`;
    
    if (image) {
        prompt += `
    - Image: ${image}`;
    }
    
    if (cta) {
        prompt += `
    - Button: ${cta.text}, CTA Link: ${cta.route}`;
    }
    
    prompt += `
    Ensure the component is written in JavaScript and does not require any additional npm packages.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    
    return response.text;
};




// faqs are an array of objects with question and answer fields
// export const getFAQLayout = async (faqs) => {
    
//         let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;
        
//         prompt += ` The component should include:`;
        
//         faqs.forEach((faq, index) => {
//             prompt += `
//         - Question ${index + 1}: ${faq.question}
//         - Answer ${index + 1}: ${faq.answer}`;
//         });
        
//         prompt += `
//         Ensure the component is written in JavaScript and does not require any additional npm packages.`;
    
//         const response = await ai.models.generateContent({
//             model: "gemini-2.0-flash",
//             contents: prompt,
//         });
        
//         return response.text;
// }

export const getFAQLayout = async (faqs, style) => {
    console.log("FAQs received:", faqs);
    console.log("Style received:", style);

    if (!style) throw new Error("Style parameter is missing in getFAQLayout");

    let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;

    prompt += ` The component should include:`;

    faqs.forEach((faq, index) => {
        prompt += `
        - Question ${index + 1}: ${faq.question}
        - Answer ${index + 1}: ${faq.answer}`;
    });

    prompt += `
        Ensure the component is written in JavaScript and does not require any additional npm packages.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });

    return response.text;
};




export const getWhyChooseUsLayout = async ({ why1, why2, why3, style }) => {

    let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;
    
    prompt += ` The component should include:
    - Reason 1: ${why1}
    - Reason 2: ${why2}
    - Reason 3: ${why3}`;
    
    prompt += `
    Ensure the component is written in JavaScript and does not require any additional npm packages.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    
    return response.text;
}



export const getFooterLayout = async ({ links, title, style }) => {
    let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;
    
    prompt += ` The component should include:
    - Title: ${title}`;
    
    links.forEach((link, index) => {
        prompt += `
    - Link ${index + 1}: ${link.text}, URL: ${link.route}`;
    });
    
    prompt += `
    Ensure the component is written in JavaScript and does not require any additional npm packages.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    
    return response.text;
};




export const getShopHeroLayout = async ({ heading, subhead, image, cta, style }) => {

    let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;
    
    prompt += ` The component should include:
    - Headline: ${heading}
    - Subhead: ${subhead}`;
    
    if (image) {
        prompt += `
    - Image: ${image}`;
    }
    
    if (cta) {
        prompt += `
    - Button: ${cta.text}, CTA Link: ${cta.route}`;
    }
    
    prompt += `
    Ensure the component is written in JavaScript and does not require any additional npm packages.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    
    return response.text;
}




export const getProductCardLayout = async ({ name, description, price, category }) => {

    let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;

    prompt += ` The component should include:
    - Name: ${name}
    - Description: ${description}
    - Price: ${price}
    - Category: ${category}`;

    prompt += `
    Ensure the component is written in JavaScript and does not require any additional npm packages.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });

    return response.text;
}



export const getBlogHeroLayout = async ({ heading, subhead, style }) => {
    let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;
    
    prompt += ` The component should include:
    - Headline: ${heading}
    - Subhead: ${subhead}`;
    
    prompt += `
    Ensure the component is written in JavaScript and does not require any additional npm packages.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    
    return response.text;
}



export const getBlogCardLayout = async ({ style }) => {
    let prompt = `I want a Next.js 14 component with "use client" at the top. The component should follow a consistent design style for reuse across sections like Hero, Why Choose Us, and Testimonials. The design should follow these style parameters: ${JSON.stringify(style)}.`;
    
    prompt += ` The component should include:
    - Blog Title
    - Blog Content
    - Author`;
    
    prompt += `
    Ensure the component is written in JavaScript and does not require any additional npm packages.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
    });
    
    return response.text;
}