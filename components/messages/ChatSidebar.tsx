import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChatType, Following } from "@/utils/types";
import AlphabetAvatar from "../ui/AlphabetAvatar";

interface ChatSidebarProps {
    currentUserId: string;
    chats: ChatType[];
    onChatSelect: (chat: ChatType) => void;
    onSearch: (searchText: string) => void;
    followers: Following[]; // Followers from `useUser`
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ currentUserId, chats, onChatSelect, onSearch, followers }) => {
    const [searchText, setSearchText] = useState("");
    const [filteredFollowers, setFilteredFollowers] = useState(followers);
    const [visibleCount, setVisibleCount] = useState(5);

    useEffect(() => {
        if (searchText.trim()) {
            const searchResults = followers.filter((follower) =>
                follower.username.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredFollowers(searchResults);
            setVisibleCount(5); // Reset visible count on new search
        } else {
            setFilteredFollowers([]); // Clear results if no search text
        }
    }, [searchText, followers]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            setVisibleCount((prev) => Math.min(prev + 5, filteredFollowers.length));
        }
    };

    return (
        <div className="w-72 border-r border-neutral-700 rounded-l-xl bg-neutral-800 flex flex-col">
            <div className="p-4 border-b border-neutral-700">
                <input
                    type="text"
                    className="w-full px-4 py-2 rounded bg-neutral-700 text-white placeholder-neutral-400"
                    placeholder="Search chats or users..."
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        onSearch(e.target.value);
                    }}
                />
            </div>

            {searchText && filteredFollowers.length > 0 ? (
                <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>
                    {filteredFollowers.slice(0, visibleCount).map((follower) => (
                        <div
                            key={follower._id}
                            className="p-4 hover:bg-neutral-700 cursor-pointer border-b border-neutral-700 flex gap-3"
                            onClick={() => console.log("Selected follower:", follower)}
                        >
                            {
                                follower.picture ? (
                                    <Image
                                        src={follower.picture}
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ) : (
                                    <AlphabetAvatar name={follower.username} size={30} />
                                )
                            }
                            <p className="text-white font-medium">{follower.username}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    {chats.length > 0 ? (
                        chats.map((chat) => (
                            <div
                                key={chat.chatId}
                                className="p-4 hover:bg-neutral-700 cursor-pointer border-b border-neutral-700"
                                onClick={() => onChatSelect(chat)}
                            >
                                <p className="text-white font-medium">
                                    {chat.users
                                        .filter((user) => user.userId !== currentUserId)
                                        .map((user) => user.username)}
                                </p>
                                <p className="text-neutral-400 text-sm truncate">{chat.latestMessage.content}</p>
                            </div>
                        ))
                    ) : (
                        <div className="mx-4 my-4 text-white">No chats to show</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ChatSidebar;
