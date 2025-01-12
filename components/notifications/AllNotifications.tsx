"use client";

import React, { useEffect, useState } from 'react';
import {useUser} from "@/context/UserContext";
import Loading from "@/components/ui/Loading";
import NotificationCard from "@/components/notifications/NotificationCard";

const AllNotifications = () => {
    const { user: currentUser, notificationSocket, socket } = useUser();
    const [notifications, setNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect (() => {
      getNotification();
      return () => {
        notificationSocket?.off("notification-send");
    };
    }, [notificationSocket, currentUser?.username])
    const getNotification=()=>{
      const data={
          username: currentUser?.username,
      }
      console.log("notificationSocket: ", notificationSocket)
      
      // Request notifications from the server
      notificationSocket?.emit("get-notification", data);

      // Listen for notifications
      notificationSocket?.on("notification-send",(data)=>{
        console.log("inside the notification send")
          const parsedNotifications = data.map((item: string) => JSON.parse(item));
          console.log("Parsed notifications:", parsedNotifications);
          setNotifications(parsedNotifications);
            setLoading(false);
      })
 

  if (loading) {
    return <Loading />;
} }
  return (
    <div className='ml-10 md:ml-20 p-2 md:p-10 rounded-2xl bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full'>
      <h1 className="text-2xl font-bold text-white">Notifications</h1>
            <div className="flex flex-col gap-4">
                {notifications.length > 0 ? (
                    notifications.map((notification) => (
                        <NotificationCard key={notification.id} notification={notification} />
                    ))
                ) : (
                    <p className="text-neutral-400">No notifications yet.</p>
                )}
            </div>
    </div>
  )
}

export default AllNotifications
