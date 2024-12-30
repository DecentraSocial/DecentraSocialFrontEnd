import React, { useEffect, useState } from 'react';
import io, { Socket } from "socket.io-client";
import { ChatType, MessageType } from '@/utils/types';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useUser } from '@/context/UserContext';

interface MessageBoxProps {
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    selectedChat: ChatType
}

const MessageBox: React.FC<MessageBoxProps> = ({ messages, setMessages,selectedChat }) => {
    const [message, setMessage] = useState("");
    const { user: currentUser, token,socket } = useUser();

    useEffect(()=>{
        socket?.on("chat history",(data)=>{
            setMessages(data);
        })
    },[message,messages])

    const handleSendMessage = (message: string) => {
        const data = {
            "content": message,
            "sender": currentUser?._id,
            "chat": selectedChat._id
        }
        if (socket)
            socket.emit("message sent", data);
        // setMessages((prev) => [
        //     ...prev,
        //     {
        //         messageId: "msg1",
        //         sender: {
        //             userId: currentUser?._id || "",
        //             username: currentUser?.username || "",
        //             picture: currentUser?.picture || "",
        //         },
        //         content: message,
        //         chatId: "chat1",
        //         createdAt: Date.now().toString(),
        //         updatedAt: Date.now().toString(),
        //     }
        // ]);
        getAllMessage();
    };

    const getAllMessage=()=>{
        const data = {
            "chatId": selectedChat._id
        }
        socket?.emit("join chat",data);

        socket?.on("chat history",(data)=>{
            console.log("data received from decentria chat: ",data);
            setMessages(data);
        })
    }
    return (
        <div>
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleSendMessage} message={message} setMessage={setMessage} setMessages={setMessages} />
        </div>
    )
}

export default MessageBox
