"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PostType, ProfileType } from "@/utils/types";
import Post from "./Post";

// Example post data structure based on postSchema

const examplePosts: PostType[] = [
    {
        _id: "1",
        userId: "user123",
        username: "john_doe",
        post: "Exploring the mountains! #adventure",
        images: ["/temp/mountain.jpg"],
        videos: [],
        likes: ["user456", "user789"],
        comments: [
            {
                _id: "comment1",
                userInfo: "user456",
                comment: "Wow, that looks amazing!",
            },
        ],
        createdAt: "11/5/2024, 10:03:51 PM",
    },
    {
        _id: "2",
        userId: "user123",
        username: "john_doe",
        post: "Another beautiful sunset 🌅",
        images: [],
        videos: ["/temp/car_video.mp4"],
        likes: ["user789"],
        comments: [],
        createdAt: "11/5/2024, 10:03:51 PM",
    },
    {
        _id: "2",
        userId: "user123",
        username: "john_doe",
        post: "Another beautiful sunset 🌅",
        images: [],
        videos: [],
        likes: ["user789"],
        comments: [],
        createdAt: "11/5/2024, 10:03:51 PM",
    },
];

// Dummy data for followers and following
const followersData = [
    { _id: "1", username: "alice_wonder", profilePicture: "/temp/av1.png" },
    { _id: "2", username: "bob_the_builder", profilePicture: "/temp/av2.png" },
    { _id: "3", username: "charlie_chap", profilePicture: "/temp/av3.png" },
];

const followingData = [
    { _id: "4", username: "daisy_duke", profilePicture: "/temp/av4.png" },
    { _id: "5", username: "elton_john", profilePicture: "/temp/av5.png" },
    { _id: "6", username: "freddie_mercury", profilePicture: "/temp/av6.png" },
];


const Profile = () => {
    const [activeTab, setActiveTab] = useState("posts");
    const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>(
        followingData.reduce((acc, user) => ({ ...acc, [user._id]: true }), {})
    );
    const [hoveringUserId, setHoveringUserId] = useState<string | null>(null);

    // Sample user ID to check if the current user liked a post
    const currentUserId = "user456";

    // Sample user data
    const profile: ProfileType = {
        username: "john_doe",
        bio: "Adventurer, traveler, and photographer.",
        profilePicture: "/temp/sample_profile.jpg",
        followers: 120,
        following: 75,
    };

    // Toggle follow/unfollow status for a user
    const toggleFollow = (userId: string) => {
        setFollowStatus((prevStatus) => ({
            ...prevStatus,
            [userId]: !prevStatus[userId],
        }));
        console.log("followStatus: ", followStatus)
        console.log("hoveringUserId: ", hoveringUserId)
    };

    // Render post content with media, likes, and comments
    const renderPostContent = () => (
        <Post posts={examplePosts} user={profile} currentUserId={currentUserId} />
    );

    const renderFollowersFollowing = () => {
        const data = activeTab === "followers" ? followersData : followingData;
        const title = activeTab === "followers" ? "Followers" : "Following";

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 mt-4"
            >
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {data.map((user, index) => (
                        <motion.div
                            key={user._id}
                            className="flex flex-wrap items-center justify-between gap-2 bg-neutral-800 p-3 rounded-lg text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                            <div className="flex items-center gap-3">
                                <Image
                                    width={50}
                                    height={50}
                                    src={user.profilePicture}
                                    alt={user.username}
                                    className="w-12 h-12 rounded-full border border-neutral-700"
                                />
                                <p className="font-normal md:font-semibold text-sm md:text-base">{user.username}</p>
                            </div>

                            {/* Follow/Unfollow button - only show on Following tab */}
                            {activeTab === "following" && (
                                <motion.button
                                    onMouseEnter={() => setHoveringUserId(user._id)}
                                    onMouseLeave={() => setHoveringUserId(null)}
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor: followStatus[user._id] ? "#f87171" : "#60a5fa",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    onClick={() => toggleFollow(user._id)}
                                    className="px-2 md:px-4 py-1 rounded-full text-sm md:text-base md:font-semibold bg-blue-500 text-white"
                                >
                                    {followStatus[user._id]
                                        ? hoveringUserId === user._id
                                            ? "Unfollow"
                                            : "Following"
                                        : "Follow"}
                                </motion.button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    };


    return (
        <div className="ml-10 md:ml-20 p-2 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
            {/* Profile Header */}
            <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Image
                    width={100}
                    height={100}
                    src={profile.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border border-neutral-700"
                />
                <div className="text-white">
                    <h2 className="text-2xl font-bold">{profile.username}</h2>
                    <p className="text-neutral-400">{profile.bio}</p>
                </div>
            </motion.div>

            {/* Followers and Following Counts */}
            <motion.div
                className="flex gap-10 text-white text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <div className="cursor-pointer" onClick={() => setActiveTab("followers")}>
                    <span className="font-semibold">{profile.followers}</span> Followers
                </div>
                <div className="cursor-pointer" onClick={() => setActiveTab("following")}>
                    <span className="font-semibold">{profile.following}</span> Following
                </div>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-4 text-white border-b border-neutral-700 pb-2">
                {["posts", "followers", "following"].map((tab) => (
                    <motion.div
                        key={tab}
                        className={`cursor-pointer ${activeTab === tab ? "font-bold border-b-2 border-blue-500" : ""}`}
                        onClick={() => setActiveTab(tab)}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.div>
                ))}
            </div>

            {/* Tab Content */}
            <motion.div
                className="mt-4"
                key={activeTab}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeTab === "posts" && renderPostContent()}
                {activeTab === "followers" && renderFollowersFollowing()}
                {activeTab === "following" && renderFollowersFollowing()}
            </motion.div>
        </div>
    );
};

export default Profile;
