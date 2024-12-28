import React from "react";

interface Message {
    id: string;
    text: string;
    time: string;
    isSentByUser: boolean;
}

interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
                <div
                    key={msg.id}
                    className={`flex ${msg.isSentByUser ? "justify-end" : "justify-start"}`}
                >
                    <div className={`max-w-xs p-3 rounded-lg text-white ${msg.isSentByUser ? "bg-blue-600" : "bg-neutral-700"}`}>
                        <p>{msg.text}</p>
                        <span className="text-xs text-neutral-400">{msg.time}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
