import React from "react";

interface ChatSidebarProps {
    chats: { id: string; name: string; lastMessage: string }[];
    onChatSelect: (chatId: string) => void;
    onSearch: (searchText: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ chats, onChatSelect, onSearch }) => {
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
                {chats.map((chat) => (
                    <div
                        key={chat.id}
                        className="p-4 hover:bg-neutral-700 cursor-pointer border-b border-neutral-700"
                        onClick={() => onChatSelect(chat.id)}
                    >
                        <p className="text-white font-medium">{chat.name}</p>
                        <p className="text-neutral-400 text-sm truncate">{chat.lastMessage}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatSidebar;
