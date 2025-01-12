import React from "react";
import { IoSearch } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { useUser } from "@/context/UserContext";

interface ChatHeaderProps {
    name: string;
    profilePic: string;
    onSearchMessages: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ name, profilePic, onSearchMessages }) => {

    const {notificationSocket,user} = useUser()

    const gmeetNotificationSend=()=>{
        console.log("gmeet notification send")
        const data={
            username:name,
            gmeetLink:"https://meet.google.com/txm-uosf-gse?authuser=0",
            sender:user?.username
        }
        notificationSocket?.emit("sent-gmeetLink",data)
    }
    return (
        <div className="flex items-center justify-between p-4 bg-neutral-800 border-b border-neutral-700 rounded-tr-xl">
            <div className="flex items-center">
                <img
                    src={profilePic}
                    alt={name}
                    className="w-10 h-10 rounded-full mr-3"
                />
                <span className="text-white font-medium">{name}</span>
            </div>
            <div className="space-x-3">
            <button
                className="text-neutral-400 hover:text-white"
                // onClick={onSearchMessages}
            >
                <FaVideo className="h-5 w-5" onClick={gmeetNotificationSend} />
            </button>
            <button
                className="text-neutral-400 hover:text-white"
                onClick={onSearchMessages}
            >
                <IoSearch className="h-5 w-5" />
            </button>
            </div>
        </div>
    );
};

export default ChatHeader;
