import React, { useState, useEffect, useRef } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");
    setTimeout(() => generateBotResponse(input), 1000);
  };

  const generateBotResponse = (input) => {
    let botResponse = "I'm not sure how to respond to that.";
    if (input.toLowerCase().includes("hello")) {
      botResponse = "Hi there! How can I help you?";
    } else if (input.toLowerCase().includes("help")) {
      botResponse = "Sure! What do you need help with?";
    } else if (input.toLowerCase().includes("bye")) {
      botResponse = "Goodbye! Have a great day!";
    }
    setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} style={styles.button}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: { width: "300px", margin: "auto", fontFamily: "Arial, sans-serif" },
  chatBox: { height: "400px", overflowY: "auto", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", background: "#f9f9f9" },
  userMessage: { textAlign: "right", color: "white", background: "blue", padding: "5px", borderRadius: "5px", margin: "5px 0" },
  botMessage: { textAlign: "left", color: "black", background: "lightgray", padding: "5px", borderRadius: "5px", margin: "5px 0" },
  inputContainer: { display: "flex", marginTop: "10px" },
  input: { flex: 1, padding: "10px", border: "1px solid #ccc", borderRadius: "5px" },
  button: { padding: "10px", background: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }
};

export default Chatbot;
