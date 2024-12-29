"use client"
import React,{useEffect,useState} from 'react'
import ChatPage from '@/components/messages/ChatPage'
import io, { Socket } from "socket.io-client";
import { useUser } from '@/context/UserContext';

const page = () => {
    const { user: currentUser, token,setSocket } = useUser();
    const [sockets, setSockets] = useState<Socket | null>(null)
    useEffect(()=>{
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

        return () => {
            // Cleanup on unmount
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    },[])
    
    return (
        <ChatPage />
    )
}

export default page