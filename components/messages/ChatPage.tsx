"use client"

import React, { use, useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { fetchChats } from "@/utils/chat";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import NewChatModal from "./NewChatModal";
import { ChatType, ChatUserType, MessageType } from "@/utils/types";
import MessageBox from "./MessageBox";
import { io, Socket } from "socket.io-client";

const ChatPage = () => {
    const [chats, setChats] = useState<ChatType[]>([
    ]);
    const [selectedChat, setSelectedChat] = useState<ChatType>();
    const [otherUser, setOtherUser] = useState<ChatUserType>();
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sockets, setSockets] = useState<Socket | null>(null);
    const { socket, user, setSocket } = useUser();

    useEffect(() => {
        const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL || "", {
            autoConnect: false,
            auth: {
                token,
            },
        });
        setSockets(newSocket);
        setSocket(newSocket);

        newSocket.connect();
        newSocket.on("connect", () => console.log("Socket connected: from message page side", newSocket.id));
        getAllChats();
        return () => {
            // Cleanup on unmount
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [])

    useEffect(() => {
        socket?.on("chat history", (data) => {
            setMessages(data);
        })

        if (selectedChat?.users) {
            const secondUser = selectedChat.users.filter((data) => { return data._id !== user?._id });

            setOtherUser(secondUser[0]);
        }
        getAllMessages(selectedChat?._id || "");

        return () => {
            socket?.off("chat history");
        }
    }, [messages, selectedChat]);

    const getAllChats = async () => {
        if (token) {
            const fetchedChats = await fetchChats(token);
            setChats(fetchedChats.res);
        }
    }

    const getAllMessages = (id: String) => {
        socket?.emit("join chat", { chatId: id });

        socket?.on("chat history", (data) => {
            setMessages(data);
        })
    }

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

    // if (selectedChat && !otherUser)
    //     return <Loading />

    return (
        <div className="ml-10 md:ml-20 bg-neutral-900 flex w-[90%] md:w-[93%] h-full">
            <ChatSidebar
                currentUserId={currentUser!._id}
                chats={chats}
                onChatSelect={handleChatSelect}
                onSearch={(searchText) => console.log("Searching:", searchText)}
                followers={followers || []}
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
                            selectedChat={selectedChat}
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
