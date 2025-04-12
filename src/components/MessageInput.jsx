import React, { useState } from "react";

const MessageInput = ({ onSend, isDarkMode }) => {
  const [input, setInput] = useState("");

  // Trigger send on Enter or click
  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
    }
  };

  return (
    <div className={`p-3 border-t flex items-center gap-2 ${
      isDarkMode ? "bg-gray-700 border-gray-600" : "bg-white"
    }`}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className={`flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 ${
          isDarkMode
            ? "bg-gray-800 text-white border-gray-600 focus:ring-blue-500"
            : "border-gray-300 focus:ring-blue-400"
        }`}
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full font-medium transition-all duration-200"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;

