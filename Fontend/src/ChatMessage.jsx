import { TbMessageChatbotFilled } from "react-icons/tb";

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === "model";

  return (
    <div
      className={`flex items-start gap-3 my-4 w-full animate-fade-in ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      {/* Bot Icon/Avatar */}
      {isBot && (
        <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md text-white shadow-blue-100 flex-shrink-0">
          <TbMessageChatbotFilled className="text-[1.1rem]" />
        </div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[78%] px-4 py-3 text-[0.92rem] leading-relaxed shadow-sm transition-all duration-200 ${
          isBot
            ? "bg-slate-100/90 backdrop-blur-sm border border-slate-200/50 text-slate-800 rounded-2xl rounded-tl-none font-medium"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-none font-medium shadow-indigo-100"
        }`}
      >
        <p
          className="message-text select-text"
          dangerouslySetInnerHTML={{
            __html: Array.isArray(chat.text) ? chat.text.join("") : chat.text,
          }}
        />
      </div>
    </div>
  );
};

export default ChatMessage;
