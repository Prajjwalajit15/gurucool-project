import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState([]);        // Store chat messages
  const [isDarkMode, setIsDarkMode] = useState(false); // Track current theme
  const [isTyping, setIsTyping] = useState(false);     // Show typing indicator

  // Load saved messages and theme from localStorage when app loads
  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("chatMessages"));
    if (storedMessages) {
      setMessages(storedMessages);
    }

    const savedTheme = JSON.parse(localStorage.getItem("isDarkMode"));
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme);
    }
  }, []);

  // Persist messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Persist theme mode to localStorage
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // Handle sending user message + generating bot reply
  const sendMessage = (text) => {
    const newMsg = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

    // Predefined keyword-based bot replies
    const keywordResponses = {
      "hi": "Hi there! How can I assist you today?",
      "hello": "Hello! How can I help?",
      "how are you": "I'm doing well, thank you! 😊",
      "bye": "Goodbye! Take care!",
      "order": "Sure, what would you like to order?",
      "joke": "Why don't scientists trust atoms? Because they make up everything! 😄",
      "date": `Today's date is ${new Date().toLocaleDateString()}.`,
      "time": `The current time is ${new Date().toLocaleTimeString()}.`,
    };

    let botReplyText = "Sorry, I didn't understand that. Can you rephrase it?";
    for (let keyword in keywordResponses) {
      if (text.toLowerCase().includes(keyword)) {
        botReplyText = keywordResponses[keyword];
        break;
      }
    }

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true); // Start typing indicator

    // Simulate typing delay before bot replies
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: botReplyText,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false); // Hide typing indicator
    }, 1000);
  };

  return (
    <div className={`flex justify-center items-center min-h-screen px-2 py-4 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-100 to-purple-100"
    }`}>
      {/* Main chat container */}
      <div className={`w-full max-w-md rounded-2xl flex flex-col h-[90vh] overflow-hidden shadow-2xl border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        {/* Header */}
        <div className={`flex justify-between items-center px-4 py-3 text-lg font-semibold shadow-sm ${
          isDarkMode ? "text-white border-b border-gray-700" : "text-blue-600 border-b"
        }`}>
          <span className="tracking-wide">🤖 Chat with Bot</span>
          {/* Theme toggle button */}
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="text-sm px-3 py-1 rounded-full transition"
          >
            {isDarkMode ? "🌞 Day Mode" : "🌙 Night Mode"}
          </button>
        </div>

        {/* Chat window + input box */}
        <ChatWindow messages={messages} isDarkMode={isDarkMode} isTyping={isTyping} />
        <MessageInput onSend={sendMessage} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;

