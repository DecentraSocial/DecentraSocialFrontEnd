import React from "react";
import { ChatType } from "@/utils/types";

interface ChatSidebarProps {
    currentUserId: string;
    chats: ChatType[];
    onChatSelect: (chat: ChatType) => void;
    onSearch: (searchText: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentUserId, chats, onChatSelect, onSearch }) => {
    return (
        <div className="w-72 border-r border-neutral-700 rounded-l-xl bg-neutral-800 flex flex-col">
            <div className="p-4 border-b border-neutral-700">
                <input
                    type="text"
                    className="w-full px-4 py-2 rounded bg-neutral-700 text-white placeholder-neutral-400"
                    placeholder="Search chats..."
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            <div className="flex-1 overflow-y-auto">
                {chats.length > 0 ? chats.map((chat) => (
                    <div
                        key={chat.chatId}
                        className="p-4 hover:bg-neutral-700 cursor-pointer border-b border-neutral-700"
                        onClick={() => onChatSelect(chat)}
                    >
                        <p className="text-white font-medium">{chat.users.map((user => (user.userId != currentUserId && user.username)))}</p>
                        <p className="text-neutral-400 text-sm truncate">{chat?.latestMessage?.content || ""}</p>
                    </div>
                )) : (
                    <div className="mx-4 my-4 text-white">
                        No chats to show
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;
