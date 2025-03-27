// import React, { useState, useEffect } from "react";
// import { FaPaperclip, FaTimes, FaPaperPlane } from "react-icons/fa";

// // Define ChatBox Component
// const ChatBox: React.FC = () => {
//     // State Management
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const [messages, setMessages] = useState<string[]>([]);
//     const [inputValue, setInputValue] = useState<string>("");

//     // Toggle chat visibility
//     const toggleChat = () => setIsOpen(!isOpen);

//     // Handle message input change
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setInputValue(e.target.value);
//     };

//     // Send message function
//     const sendMessage = () => {
//         if (inputValue.trim() !== "") {
//             setMessages([...messages, `You: ${inputValue}`]);
//             setInputValue("");
//         }
//     };

//     // Handle Enter key to send message
//     const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Enter") {
//             sendMessage();
//         }
//     };

//     // Auto-scroll to the bottom when new messages are added
//     useEffect(() => {
//         const chatBody = document.getElementById("chatBody");
//         if (chatBody) {
//             chatBody.scrollTop = chatBody.scrollHeight;
//         }
//     }, [messages]);

//     return (
//         <div>
//             {/* Start/Close Chat Button */}
//             <button
//                 onClick={toggleChat}
//                 className="px-4 py-2 text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
//             >
//                 {isOpen ? "Close Chat" : "Start Chat"}
//             </button>

//             {/* Chat Box */}
//             {isOpen && (
//                 <div
//                     id="chatBox"
//                     className="fixed bottom-5 right-5 w-[30%] bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col"
//                 >
//                     {/* Chat Header */}
//                     <div className="flex items-center justify-between bg-green-500 text-white p-3 rounded-t-lg">
//                         <div className="flex items-center gap-3">
//                             {/* Profile Picture */}
//                             <img
//                                 src="https://via.placeholder.com/40"
//                                 alt="User Profile"
//                                 className="w-10 h-10 rounded-full"
//                             />
//                             {/* User Name */}
//                             <span className="font-semibold">John Doe</span>
//                         </div>

//                         {/* Close Button */}
//                         <button
//                             onClick={toggleChat}
//                             className="text-xl hover:text-gray-300"
//                         >
//                             <FaTimes />
//                         </button>
//                     </div>

//                     {/* Chat Body (Messages) */}
//                     <div
//                         id="chatBody"
//                         className="h-60 p-3 overflow-y-auto bg-gray-50"
//                     >
//                         {messages.length === 0 ? (
//                             <p className="text-gray-400 text-center">
//                                 No messages yet. Start the conversation!
//                             </p>
//                         ) : (
//                             messages.map((msg, index) => (
//                                 <div
//                                     key={index}
//                                     className="bg-green-100 text-gray-700 px-3 py-1 rounded-lg mb-2 self-start"
//                                 >
//                                     {msg}
//                                 </div>
//                             ))
//                         )}
//                     </div>

//                     {/* Chat Footer */}
//                     <div className="flex items-center p-3 border-t border-gray-200 bg-white">
//                         {/* Attach Button */}
//                         <button
//                             className="p-2 text-green-500 hover:bg-gray-100 rounded-lg mr-2"
//                             title="Attach File"
//                         >
//                             <FaPaperclip />
//                         </button>

//                         {/* Message Input */}
//                         <input
//                             type="text"
//                             value={inputValue}
//                             onChange={handleInputChange}
//                             onKeyPress={handleKeyPress}
//                             placeholder="Type a message..."
//                             className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
//                         />

//                         {/* Send Button */}
//                         <button
//                             onClick={sendMessage}
//                             className="ml-3 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
//                             title="Send Message"
//                         >
//                             <FaPaperPlane />
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ChatBox;
import React, { useState, useEffect } from "react";
import { FaPaperclip, FaPaperPlane } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

// Chat Box Component
const ChatBox: React.FC = () => {
    // State for managing messages and input
    const [messages, setMessages] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState<string>("");

    // Handle message input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    // Send message function
    const sendMessage = () => {
        if (inputValue.trim() !== "") {
            setMessages([...messages, `You: ${inputValue}`]);
            setInputValue("");
        }
    };

    // Handle Enter key to send message
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    // Auto-scroll to the bottom when a new message is added
    useEffect(() => {
        const chatBody = document.getElementById("chatBody");
        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="w-full max-w-2xl mx-auto my-10 border border-gray-300 rounded-lg shadow-lg">
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-blue-500 text-white p-4 rounded-t-lg">
                {/* <div className="flex items-center gap-3">
                    {/* User Profile Picture */}
                    {/* <img */}
                        {/* src="https://via.placeholder.com/40"
                        alt="User"
                        className="w-10 h-10 rounded-full"
                    /> */} 
                    {/* User Name */}
                  
                    <span className="font-semibold text-lg">Group Chat</span>
                    <Link to={"/"}>
                    <RxCross2 className="ml-0" />
                    </Link>
                   

                   
                {/* </div> */}
            </div>

            {/* Chat Body (Messages) */}
            <div
                id="chatBody"
                className="h-80 overflow-y-auto bg-gray-100 p-4"
            >
                {messages.length === 0 ? (
                    <p className="text-gray-500 text-center">
                        No messages yet. Start the conversation!
                    </p>
                ) : (
                    messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${
                                msg.startsWith("You:")
                                    ? "justify-end"
                                    : "justify-start"
                            } mb-2`}
                        >
                            <div
                                className={`${
                                    msg.startsWith("You:")
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-300 text-black"
                                } px-4 py-2 rounded-lg max-w-xs`}
                            >
                                {msg}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Chat Footer */}
            <div className="flex items-center p-4 bg-white border-t border-gray-300">
                {/* Attach Button */}
                <button
                    className="p-2 text-blue-500 hover:bg-gray-100 rounded-lg mr-2"
                    title="Attach File"
                >
                    <FaPaperclip />
                </button>

                {/* Message Input */}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
                />

                {/* Send Button */}
                <button
                    onClick={sendMessage}
                    className="ml-3 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    title="Send Message"
                >
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
