"use client";

import {useEffect} from 'react';
import { io } from "socket.io-client";
import { useUser } from "@/context/UserContext";

const NotificationSocket = () => {
    const { token, setNotificationSocket } = useUser();
    useEffect(() => {
        const newSocket = io(process.env.NEXT_PUBLIC_NOTIFICATION_SOCKET_IO_URL || "", {
            autoConnect: false,
            auth: {
                token,
            },
        });
        setNotificationSocket(newSocket);

        newSocket.connect();
        newSocket.on("connect", () => console.log("Socket connected: from layout notification page side", newSocket.id));
        // return () => {
        //     // Cleanup on unmount
        //     if (newSocket) {
        //         newSocket.disconnect();
        //     }
        // };
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default NotificationSocket
