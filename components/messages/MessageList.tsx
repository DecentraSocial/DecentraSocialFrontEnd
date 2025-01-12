import React from "react";
import { useUser } from "@/context/UserContext";
import { MessageType } from "@/utils/types";

interface MessageListProps {
    messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const { user } = useUser();

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
                <div
                    key={msg.messageId}
                    className={`flex ${msg.sender._id === user?._id ? "justify-end" : "justify-start"}`}
                >
                    <div className={`max-w-xs p-3 min-w-[15em] rounded-lg text-white ${msg.sender._id === user?._id ? "bg-blue-600" : "bg-neutral-700"}`}>
                        <p>{msg.content}</p>
                        <span className="text-xs text-neutral-400">{formatTime(msg.createdAt)}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
