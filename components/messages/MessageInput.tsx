import React, { useState } from "react";

interface MessageInputProps {
    onSendMessage: (message: string) => void;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, message, setMessage }) => {

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className="p-4 border-t border-neutral-700 bg-neutral-800 rounded-br-xl">
            <div className="flex items-center">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 px-4 py-2 rounded bg-neutral-700 text-white placeholder-neutral-400"
                    placeholder="Type a message..."
                />
                <button
                    onClick={handleSend}
                    className="ml-3 px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default MessageInput;
