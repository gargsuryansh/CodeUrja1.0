// import Contact from "../models/Contact.js";

// export const sendEnquiry = async (req, res) => {
//     try {
//         const { name, email, message } = req.body;
//         const newEnquiry = new Contact({ name, email, message });
//         await newEnquiry.save();
//         res.json({ message: "Enquiry saved successfully!", data: newEnquiry });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// };


import Contact from "../models/Contact.js";

// ✅ Create a New Contact (Already Exists)
export const sendEnquiry = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newEnquiry = new Contact({ name, email, message });
        await newEnquiry.save();
        res.status(201).json({ message: "Enquiry saved successfully!", data: newEnquiry });
    } catch (error) {
        console.error("Error saving enquiry:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Update an Existing Contact
export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, message } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            { name, email, message },
            { new: true, runValidators: true }
        );

        if (!updatedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json({ message: "Contact updated successfully!", data: updatedContact });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// ✅ Delete a Contact
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({ error: "Contact not found" });
        }

        res.status(200).json({ message: "Contact deleted successfully!" });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ error: "Server error" });
    }
};
