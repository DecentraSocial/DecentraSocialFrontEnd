"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegImage, FaVideo, FaFaceSmile } from "react-icons/fa6";
import { PostType } from "@/utils/types";
import Post from "./Post";
import GlowButton from "../ui/GlowButton";
import SuggestedUsers from "./SuggestedUsers";

const initialPosts: PostType[] = [
    {
        _id: "1",
        userId: "user1",
        username: "Alice Johnson",
        post: "Just came back from an amazing hike in the mountains!",
        createdAt: "11/1/2024, 8:20:15 AM",
        likes: ["user2", "user3"],
        comments: [
            { _id: "c1", userInfo: "John Smith", comment: "Looks amazing!" },
            { _id: "c2", userInfo: "Emma Brown", comment: "Wish I was there!" }
        ],
        images: ["/temp/hike.webp"],
        videos: [],
    },
    {
        _id: "2",
        userId: "user2",
        username: "Mark Stevens",
        post: "Trying out some new recipes today. 🍲 Who else loves experimenting in the kitchen?",
        createdAt: "11/2/2024, 12:34:56 PM",
        likes: ["user1"],
        comments: [],
        images: [],
        videos: [],
    },
    {
        _id: "3",
        userId: "user3",
        username: "Emily Davis",
        post: "Caught this beautiful sunset at the beach last evening 🌅",
        createdAt: "11/3/2024, 6:50:30 PM",
        likes: ["user1", "user2"],
        comments: [{ _id: "c3", userInfo: "Alice Johnson", comment: "Breathtaking!" }],
        images: ["/temp/sunset.jpg"],
        videos: [],
    },
    {
        _id: "4",
        userId: "user4",
        username: "Chris Martin",
        post: "Exploring video production and editing. Here’s a snippet of my latest project!",
        createdAt: "11/4/2024, 4:10:05 PM",
        likes: [],
        comments: [{ _id: "c4", userInfo: "Mark Stevens", comment: "Great job, keep it up!" }],
        images: [],
        videos: ["/temp/car_video.mp4"],
    },
    {
        _id: "5",
        userId: "user5",
        username: "Sophia Green",
        post: "The little moments matter the most. Spent some quality time reading my favorite book today 📚",
        createdAt: "11/5/2024, 9:15:45 AM",
        likes: ["user3"],
        comments: [],
        images: [],
        videos: [],
    },
    {
        _id: "6",
        userId: "user6",
        username: "Jake Wilson",
        post: "Who’s ready for the upcoming music festival? 🎶 Can’t wait to see everyone there!",
        createdAt: "11/5/2024, 11:23:17 AM",
        likes: ["user4", "user5"],
        comments: [{ _id: "c5", userInfo: "Emily Davis", comment: "I’m excited!" }],
        images: [],
        videos: [],
    },
    {
        _id: "7",
        userId: "user7",
        username: "Liam Smith",
        post: "A quick sneak peek of my newly renovated garden 🌱🌷",
        createdAt: "11/5/2024, 2:40:25 PM",
        likes: [],
        comments: [{ _id: "c6", userInfo: "Sophia Green", comment: "It looks beautiful!" }],
        images: ["/temp/garden.webp"],
        videos: [],
    },
];

const HomeFeed = () => {
    const [posts, setPosts] = useState<PostType[]>(initialPosts); // Example initial state
    const [newPostText, setNewPostText] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

    const handlePostSubmit = () => {
        if (!newPostText && !selectedImage && !selectedVideo) return;

        const newPost: PostType = {
            _id: String(Date.now()),
            userId: "user123",
            username: "Current User",
            post: newPostText,
            createdAt: "11/5/2024, 10:03:51 PM",
            likes: [],
            comments: [],
            images: selectedImage ? [URL.createObjectURL(selectedImage)] : [],
            videos: selectedVideo ? [URL.createObjectURL(selectedVideo)] : [],
        };

        setPosts([newPost, ...posts]);
        setNewPostText("");
        setSelectedImage(null);
        setSelectedVideo(null);
    };

    return (
        <div className="ml-10 md:ml-20 p-2 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
            {/* Post creation section */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-800 p-4 rounded-lg text-white flex gap-4 items-start"
            >
                {/* User's profile photo */}
                <Image
                    width={50}
                    height={50}
                    src="/temp/sample_profile.jpg" // Replace with the actual path or user profile picture variable
                    alt="User"
                    className="w-12 h-12 rounded-full border border-neutral-700"
                />

                {/* Textarea and buttons */}
                <div className="flex-1">
                    <textarea
                        className="w-full bg-neutral-700 p-3 rounded-lg mb-2 text-sm focus:outline-none resize-none"
                        placeholder="What's on your mind?"
                        value={newPostText}
                        onChange={(e) => setNewPostText(e.target.value)}
                        rows={3}
                    ></textarea>

                    <div className="flex items-center gap-4 mb-2">
                        <label className="cursor-pointer">
                            <FaRegImage className="text-gray-400 hover:text-green-500" />
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files && setSelectedImage(e.target.files[0])}
                            />
                        </label>
                        <label className="cursor-pointer">
                            <FaVideo className="text-gray-400 hover:text-blue-500" />
                            <input
                                type="file"
                                accept="video/*"
                                className="hidden"
                                onChange={(e) => e.target.files && setSelectedVideo(e.target.files[0])}
                            />
                        </label>
                        <GlowButton label="Post" onClick={handlePostSubmit} />
                    </div>

                    {selectedImage && (
                        <div className="mt-2">
                            <p className="text-sm text-neutral-400">Selected Image: {selectedImage.name}</p>
                        </div>
                    )}
                    {selectedVideo && (
                        <div className="mt-2">
                            <p className="text-sm text-neutral-400">Selected Video: {selectedVideo.name}</p>
                        </div>
                    )}
                </div>
            </motion.div>

            <div className="grid lg:grid-cols-8 gap-5">
                {/* Render posts */}
                <Post
                    className="col-span-6"
                    posts={posts}
                    user={{
                        username: "john_doe",
                        bio: "Adventurer, traveler, and photographer.",
                        profilePicture: "/temp/sample_profile.jpg",
                        followers: 120,
                        following: 75,
                    }}
                    currentUserId="currentUserId"
                />

                {/* Suggested users section */}
                <div className="hidden lg:block col-span-2">
                    <SuggestedUsers />
                </div>
            </div>
        </div>
    );
};

export default HomeFeed;
