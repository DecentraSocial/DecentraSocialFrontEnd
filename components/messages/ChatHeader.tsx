import React from "react";
import { IoSearch } from "react-icons/io5";

interface ChatHeaderProps {
    name: string;
    profilePic: string;
    onSearchMessages: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ name, profilePic, onSearchMessages }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-neutral-800 border-b border-neutral-700 rounded-tr-xl">
            <div className="flex items-center">
                <img
                    src={profilePic}
                    alt={name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <span className="text-white font-medium">{name}</span>
            </div>
            <button
                className="text-neutral-400 hover:text-white"
                onClick={onSearchMessages}
            >
                <IoSearch className="h-5 w-5" />
            </button>
        </div>
    );
};

export default ChatHeader;
