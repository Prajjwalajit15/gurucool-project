import React from "react";

const MessageBubble = ({ text, sender, timestamp, isDarkMode }) => {
  const isUser = sender === "user"; // Sender check
  const avatar = isUser
    ? "https://img.icons8.com/ios-filled/30/user-male-circle.png"
    : "https://img.icons8.com/ios-filled/30/robot-2.png";

  return (
    <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} gap-1`}>
      <div className="flex items-end gap-2">
        {/* Left avatar for bot */}
        {!isUser && <img src={avatar} alt="avatar" className="w-6 h-6" />}

        {/* Chat bubble */}
        <div
          className={`max-w-[80%] md:max-w-[70%] px-4 py-2 rounded-2xl text-sm break-words shadow-md animate-fade-in ${
            isUser
              ? "bg-blue-600 text-white rounded-br-none"
              : isDarkMode
              ? "bg-gray-700 text-white rounded-bl-none"
              : "bg-gray-100 text-gray-900 rounded-bl-none"
          }`}
        >
          {text}
        </div>

        {/* Right avatar for user */}
        {isUser && <img src={avatar} alt="avatar" className="w-6 h-6" />}
      </div>

      {/* Timestamp */}
      <span
        className={`text-[10px] ${isUser ? "text-right text-blue-300" : "text-left text-gray-400"}`}
      >
        {timestamp}
      </span>
    </div>
  );
};

export default MessageBubble;


