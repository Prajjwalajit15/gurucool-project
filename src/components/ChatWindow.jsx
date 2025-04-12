import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

const ChatWindow = ({ messages, isDarkMode, isTyping }) => {
  const bottomRef = useRef(null);  

   
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className={`flex-1 overflow-y-auto px-4 py-2 space-y-3 ${
      isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
    }`}>
       
      {messages.map((msg) => (
        <MessageBubble key={msg.id} {...msg} isDarkMode={isDarkMode} />
      ))}

       
      {isTyping && (
        <div className="flex items-center gap-2 animate-pulse text-sm text-gray-500">
          <img
            src="https://img.icons8.com/ios-filled/30/robot-2.png"
            alt="Bot"
            className="w-6 h-6"
          />
          <span>Bot is typing...</span>
        </div>
      )}

       
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
