import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState([]);         
  const [isDarkMode, setIsDarkMode] = useState(false);  
  const [isTyping, setIsTyping] = useState(false);      

 
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

 
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

 
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

 
  const sendMessage = (text) => {
    const newMsg = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date().toLocaleTimeString(),
    };

     
    const keywordResponses = {
      "hi": "Hi there! How can I assist you today?",
      "hii": "Hi there! How can I assist you today?",
      "hello": "Hi there! How can I assist you today?",
      "how are you": "I'm doing great, thanks for asking! How about you?",
      "bye": "Goodbye! Have a great day!",
      "order": "Sure! What would you like to order?",
      "price": "Could you specify which item you're asking about for the price?",
      "help": "How can I help you? Please tell me your issue!",
      "thank you": "You're welcome! 😊",
      "where are you": "I'm a virtual assistant—always online for you!",
      "who are you": "I'm a chatbot here to help! 😊",
      "what's your name": "Call me Bot! 🤖",
      "can you help me": "Absolutely! What do you need help with?",
      "good morning": "Good morning! ☀️",
      "good night": "Good night! 🌙 Sleep tight.",
      "weather": "Please check your local forecast online. ☁️",
      "time": `The current time is ${new Date().toLocaleTimeString()}.`,
      "date": `Today's date is ${new Date().toLocaleDateString()}.`,
      "joke": "Why don’t skeletons fight each other? They don’t have the guts! 😄",
      "favorite color": "Blue! What's yours?",
      "love": "Love is a wonderful thing! 💖",
      "what can you do": "I answer questions and keep you company!",
      "thanks": "You're welcome anytime! 🙌",
      "sorry": "No worries! 😊",
      "payment": "I can't take payments, but I can guide you.",
      "good": "Glad to hear that! 😊",
      "bad": "Sorry to hear. Want to talk about it?",
      "help me": "Of course! How can I help?",
      "what's up": "Just here, helping you! 🚀",
    };

    let botReplyText = "Sorry, I didn't understand that. Can you rephrase it?";
    for (let keyword in keywordResponses) {
      if (text.toLowerCase().includes(keyword)) {
        botReplyText = keywordResponses[keyword];
        break;
      }
    }

    setMessages((prev) => [...prev, newMsg]);
    setIsTyping(true); 
 
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        text: botReplyText,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);  
    }, 1000);
  };

  return (
    <div className={`flex justify-center items-center min-h-screen px-2 py-4 ${
      isDarkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-100 to-purple-100"
    }`}>
       
      <div className={`w-full max-w-md rounded-2xl flex flex-col h-[90vh] overflow-hidden shadow-2xl border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}>
        {/* Header */}
        <div className={`flex justify-between items-center px-4 py-3 text-lg font-semibold shadow-sm ${
          isDarkMode ? "text-white border-b border-gray-700" : "text-blue-600 border-b"
        }`}>
          <span className="tracking-wide">🤖 Chat with Bot</span>
           
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            className="text-sm px-3 py-1 rounded-full transition"
          >
            {isDarkMode ? "🌞 Day Mode" : "🌙 Night Mode"}
          </button>
        </div>

         
        <ChatWindow messages={messages} isDarkMode={isDarkMode} isTyping={isTyping} />
        <MessageInput onSend={sendMessage} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
}

export default App;

