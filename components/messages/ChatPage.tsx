"use client"

import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import NewChatModal from "./NewChatModal";

const ChatPage = () => {
    const [chats, setChats] = useState([
        { id: "1", name: "John Doe", lastMessage: "Hey, how are you?" },
        { id: "2", name: "Jane Smith", lastMessage: "See you tomorrow!" },
    ]);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [messages, setMessages] = useState([
        { id: "1", text: "Hello!", time: "10:30 AM", isSentByUser: true },
        { id: "2", text: "Hi there!", time: "10:31 AM", isSentByUser: false },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const following = [
        { id: "3", name: "Alice Cooper" },
        { id: "4", name: "Bob Dylan" },
    ];

    const handleChatSelect = (chatId: string) => {
        setSelectedChat(chatId);
        // Fetch messages for selected chat
    };

    const handleSendMessage = (message: string) => {
        setMessages((prev) => [
            ...prev,
            {
                id: Date.now().toString(),
                text: message,
                time: new Date().toLocaleTimeString(),
                isSentByUser: true,
            },
        ]);
    };

    const handleStartNewChat = (user: { id: string; name: string }) => {
        const newChat = {
            id: user.id,
            name: user.name,
            lastMessage: "",
        };
        setChats((prev) => [newChat, ...prev]);
        setSelectedChat(user.id);
        setIsModalOpen(false);
    };


    return (
        <div className="ml-10 md:ml-20 bg-neutral-900 flex w-[90%] md:w-[93%] h-full">
            <ChatSidebar
                chats={chats}
                onChatSelect={handleChatSelect}
                onSearch={(searchText) => console.log("Searching:", searchText)}
            />
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        <ChatHeader
                            name="John Doe"
                            profilePic="https://via.placeholder.com/40"
                            onSearchMessages={() => console.log("Searching messages...")}
                        />
                        <MessageList messages={messages} />
                        <MessageInput onSendMessage={handleSendMessage} />
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-neutral-400 border-r border-t border-b border-neutral-700 rounded-r-xl">
                        <p>Select a chat to start messaging</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Start New Chat
                        </button>
                    </div>
                )}
            </div>
            {isModalOpen && (
                <NewChatModal
                    following={following}
                    onClose={() => setIsModalOpen(false)}
                    onStartChat={handleStartNewChat}
                />
            )}
        </div>
    );
};

export default ChatPage;
