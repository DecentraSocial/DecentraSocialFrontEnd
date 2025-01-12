import React from "react";
import { NotificationType } from "@/utils/types";
// import Image from "next/image";
// import AlphabetAvatar from "@/components/ui/AlphabetAvatar";
import { motion } from "framer-motion";

interface NotificationCardProps {
    notification: NotificationType;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notification }) => {
    const { message, createdAt } = notification;

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-4 p-4 bg-neutral-800 rounded-lg text-white shadow-md hover:shadow-lg"
        >
            {/* {sender.picture ? (
                <Image
                    src={sender.picture}
                    alt={sender.username}
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full"
                />
            ) : (
                <AlphabetAvatar name={sender.username} />
            )} */}
            <div className="flex-1">
                <p>
                    <span className="font-bold">{"Pushpa"}</span> {message}
                </p>
                <p className="text-sm text-neutral-400">{formatTime(createdAt)}</p>
            </div>
        </motion.div>
    );
};

export default NotificationCard;
