"use client"
import UserProfile from '@/components/user/UserProfile'

const page = () => {
    // const {token,setNotificationSocket,notificationSocket}=useUser();
    // const [sockets, setSockets] = useState<Socket | null>(null)

    // useEffect(()=>{
    //     const newSocket = io(process.env.NEXT_PUBLIC_NOTIFICATION_SOCKET_IO_URL || "", {
    //         autoConnect: false,
    //         auth: {
    //             token,
    //         },
    //     });
    //     setNotificationSocket(newSocket);
    //     setSockets(newSocket);

    //     newSocket.connect();
    //     newSocket.on("connect", () => console.log("Socket connected: from message page side", newSocket.id));

    //     return () => {
    //         // Cleanup on unmount
    //         if (newSocket) {
    //             newSocket.disconnect();
    //         }
    //     };
    // },[])
    // const setNotification=()=>{
    //     const data={
    //         user1:"dhruv",
    //         user2:"pushpa2",
    //         messageType:"follow"
    //     }
    //     notificationSocket?.emit("set-notfication",data);
    // }
    // const getNotification=()=>{
    //     const data={
    //         username:"pushpa2"
    //     }
    //     notificationSocket?.emit("get-notification",data);

    //     notificationSocket?.on("notification-send",(data)=>{
    //         const parsedNotifications = data.map((item: string) => JSON.parse(item));
    //         console.log("Parsed notifications:", parsedNotifications);
    //     })
    // }
    return (
        <div>
            <UserProfile />
            {/* <button onClick={()=>setNotification()}> send Notification</button>
            <br />
            <br />
            <button onClick={()=>getNotification()}> get Notification</button> */}
        </div>
    )
}

export default page
