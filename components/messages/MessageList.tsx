import React from "react";
import { useUser } from "@/context/UserContext";
import { MessageType } from "@/utils/types";

interface MessageListProps {
    messages: MessageType[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    const { user: currentUser, } = useUser();
    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
                <div
                    key={msg.messageId}
                    className={`flex ${msg.sender.userId === currentUser?._id ? "justify-end" : "justify-start"}`}
                >
                    <div className={`max-w-xs p-3 rounded-lg text-white ${msg.sender.userId === currentUser?._id ? "bg-blue-600" : "bg-neutral-700"}`}>
                        <p>{msg.content}</p>
                        <span className="text-xs text-neutral-400">{msg.createdAt}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageList;
