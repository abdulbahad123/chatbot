import React, { useEffect, useRef, useState } from "react";
// If using npm: import html2pdf from "html2pdf.js";

const Chatbot = () => {
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([
    { role: "bot", text: "👋 Hi! I'm XYZ chatbot, your virtual assistant 🤖." },
    { role: "user", text: "Hello, I need some help." },
    { role: "bot", text: "Sure! What can I assist you with today? 💡" },
    { role: "user", text: "Tell me about your services." },
    { role: "bot", text: "We offer app and web development services. 🚀" },
    { role: "bot", text: "Thanks for chatting with me! 📝 Your conversation will now be downloaded." }
  ]);

  useEffect(() => {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.text.includes("downloaded")) {
      setTimeout(() => {
        downloadPDF();
      }, 1000); // Give UI time to render
    }
  }, [messages]);

  const downloadPDF = () => {
    const element = chatRef.current;

    const opt = {
      margin: 0.5,
      filename: "xyzchat_conversation.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    window.html2pdf().set(opt).from(element).save();
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        id="chat-messages"
        ref={chatRef}
        style={{
          width: "350px",
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          fontFamily: "Arial"
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: msg.role === "bot" ? "#e0e0ff" : "#d0ffd0",
              textAlign: msg.role === "bot" ? "left" : "right"
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
