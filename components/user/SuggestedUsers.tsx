"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import GlowButton from "../ui/GlowButton"; // Assuming GlowButton is a reusable button component

interface SuggestedUserType {
    userId: string;
    username: string;
    profilePicture: string;
}

const suggestedUsers: SuggestedUserType[] = [
    { userId: "user8", username: "Michael Scott", profilePicture: "/temp/av1.png" },
    { userId: "user9", username: "Pam Beesly", profilePicture: "/temp/av2.png" },
    { userId: "user10", username: "Jim Halpert", profilePicture: "/temp/av3.png" },
    { userId: "user11", username: "Dwight Schrute", profilePicture: "/temp/av4.png" },
];

const SuggestedUsers = () => {
    const [followedUsers, setFollowedUsers] = useState<string[]>([]);

    const handleFollow = (userId: string) => {
        setFollowedUsers((prev) => [...prev, userId]);
    };

    return (
        <div className="bg-neutral-800 p-4 rounded-lg text-white w-full max-w-xs">
            <h2 className="text-lg font-semibold mb-4">Who to follow</h2>
            {suggestedUsers.map((user) => (
                <motion.div
                    key={user.userId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex items-center gap-3 mb-4 p-2 rounded-md hover:bg-neutral-700"
                >
                    <Image
                        width={50}
                        height={50}
                        src={user.profilePicture}
                        alt={user.username}
                        className="w-10 h-10 rounded-full border border-neutral-600"
                    />
                    <div className="flex-1">
                        <p className="font-medium">{user.username}</p>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-4 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors duration-150"
                            onClick={() => handleFollow(user.userId)}
                            disabled={followedUsers.includes(user.userId)}
                        >
                            {followedUsers.includes(user.userId) ? "Following" : "Follow"}
                        </motion.button>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

export default SuggestedUsers;
