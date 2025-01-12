"use client";

import React, { useEffect} from 'react';
import {useUser} from "@/context/UserContext";

const AllNotifications = () => {
    const { user: currentUser, notificationSocket } = useUser();
    useEffect (() => {
      getNotification();
    }, [])
    const getNotification=()=>{
      const data={
          username: currentUser?.username,
      }
      console.log("notificationSocket: ", notificationSocket)
      notificationSocket?.emit("get-notification", data);

      notificationSocket?.on("notification-send",(data)=>{
        console.log("inside the notification send")
          const parsedNotifications = data.map((item: string) => JSON.parse(item));
          console.log("Parsed notifications:", parsedNotifications);
      })
  }
  return (
    <div>
      hi
    </div>
  )
}

export default AllNotifications
