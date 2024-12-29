import React, { useEffect, useState } from 'react';
import io, { Socket } from "socket.io-client";
import { MessageType } from '@/utils/types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useUser } from '@/context/UserContext';

interface MessageBoxProps {
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

const MessageBox: React.FC<MessageBoxProps> = ({ messages, setMessages }) => {
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null)
    const { user: currentUser, token } = useUser();
    useEffect(() => {
        // Initialize the socket
        const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_IO_URL || "", {
            autoConnect: false,
            auth: {
                token,
            },
        });
        setSocket(newSocket);
        return () => {
            // Cleanup on unmount
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, [token]);

    const handleSendMessage = (message: string) => {
        const data = {
            content: message,
            sender: currentUser?._id,
            chat: "67700174cd16f63f4e85e8ee"
        }
        if (socket)
            socket.emit("message sent", data);
        setMessages((prev) => [
            ...prev,
            {
                messageId: "msg1",
                sender: {
                    userId: currentUser?._id || "",
                    username: currentUser?.username || "",
                    picture: currentUser?.picture || "",
                },
                content: message,
                chatId: "chat1",
                createdAt: Date.now().toString(),
                updatedAt: Date.now().toString(),
            }
        ]);
    };
    return (
        <div>
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} message={message} setMessage={setMessage} />
        </div>
    )
}

export default MessageBox
