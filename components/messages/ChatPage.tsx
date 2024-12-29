"use client"

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { fetchChats } from "@/utils/chat";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import NewChatModal from "./NewChatModal";
import { ChatType, ChatUserType, MessageType } from "@/utils/types";
import Loading from "../ui/Loading";
import MessageBox from "./MessageBox";

const ChatPage = () => {
    const [chats, setChats] = useState<ChatType[]>([
    ]);
    const [selectedChat, setSelectedChat] = useState<ChatType>();
    const [otherUser, setOtherUser] = useState<ChatUserType>();
    const [messages, setMessages] = useState<MessageType[]>([
        {
            messageId: "msg1",
            sender: {
                userId: "user1",
                username: "Alice",
                picture: "alice.jpg",
            },
            content: "Hi, how are you?",
            chatId: "chat1",
            createdAt: "2024-12-28T10:00:00Z",
            updatedAt: "2024-12-28T10:00:00Z",
        },
        {
            messageId: "msg2",
            sender: {
                userId: "user2",
                username: "Bob",
                picture: "bob.jpg",
            },
            content: "I'm doing great, thanks! What about you?",
            chatId: "chat1",
            createdAt: "2024-12-28T10:02:00Z",
            updatedAt: "2024-12-28T10:02:00Z",
        },
        {
            messageId: "msg3",
            sender: {
                userId: "user1",
                username: "Alice",
                picture: "alice.jpg",
            },
            content: "I'm good too, just catching up with work.",
            chatId: "chat1",
            createdAt: "2024-12-28T10:05:00Z",
            updatedAt: "2024-12-28T10:05:00Z",
        },
        {
            messageId: "msg4",
            sender: {
                userId: "user3",
                username: "Charlie",
                picture: "charlie.jpg",
            },
            content: "Hey everyone, what's up?",
            chatId: "chat2",
            createdAt: "2024-12-28T10:10:00Z",
            updatedAt: "2024-12-28T10:10:00Z",
        },
        {
            messageId: "msg5",
            sender: {
                userId: "user2",
                username: "Bob",
                picture: "bob.jpg",
            },
            content: "Not much, Charlie. How about you?",
            chatId: "chat2",
            createdAt: "2024-12-28T10:12:00Z",
            updatedAt: "2024-12-28T10:12:00Z",
        },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAllChats();
    }, []);

    const getAllChats = async () => {
        if (token) {
            const fetchedChats = await fetchChats(token);
            setChats(fetchedChats.res);
        }
    }

    useEffect(() => {
        if (selectedChat?.users) {
            const secondUser = selectedChat.users.find(
                (user) => user.userId !== currentUser?._id
            );
            console.log("secondUser: ", secondUser);
            setOtherUser(secondUser); // Set the single user
        }
    }, [selectedChat]);

    const { user: currentUser, followers, token } = useUser();

    const following = [
        { id: "3", name: "Alice Cooper" },
        { id: "4", name: "Bob Dylan" },
    ];

    const handleChatSelect = (chat: ChatType) => {
        setSelectedChat(chat);
        // Fetch messages for selected chat
    };

    const handleStartNewChat = (user: { id: string; name: string }) => {
        // const newChat = {
        //     id: user.id,
        //     name: user.name,
        //     lastMessage: "",
        // };
        // setChats((prev) => [newChat, ...prev]);
        // setSelectedChat(user.id);
        // setIsModalOpen(false);
    };

    if (selectedChat && !otherUser)
        return <Loading />

    return (
        <div className="ml-10 md:ml-20 bg-neutral-900 flex w-[90%] md:w-[93%] h-full">
            <ChatSidebar
                currentUserId={currentUser!._id}
                chats={chats}
                onChatSelect={handleChatSelect}
                onSearch={(searchText) => console.log("Searching:", searchText)}
            />
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        <ChatHeader
                            name={otherUser?.username || ""}
                            profilePic={otherUser?.picture || ""}
                            onSearchMessages={() => console.log("Searching messages...")}
                        />
                        <MessageBox
                            messages={messages}
                            setMessages={setMessages}
                        />
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
