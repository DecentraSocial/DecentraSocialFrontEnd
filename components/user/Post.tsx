"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa6";
import { PostType, ProfileType } from "@/utils/types";

interface PostProps {
    posts: PostType[];
    user: ProfileType;
    currentUserId: string;
}

const Post = ({ posts, user, currentUserId }: PostProps) => {
    const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
    // Function to toggle comments visibility
    const toggleComments = (postId: string) => {
        setShowComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };
    return (
        <div className="flex flex-col gap-6 w-full max-w-5xl place-self-center">
            {posts.map((post, index) => (
                <motion.div
                    key={post._id}
                    className="bg-neutral-800 p-4 rounded-lg text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Image
                            width={100}
                            height={100}
                            src={user.profilePicture}
                            alt="User"
                            className="w-10 h-10 rounded-full border border-neutral-700"
                        />
                        <div>
                            <p className="font-semibold">{post.username}</p>
                            <p className="text-sm text-neutral-400">{post.createdAt.toLocaleString()}</p>
                        </div>
                    </div>
                    <p className="mb-4">{post.post}</p>
                    {/* Render images if present */}
                    {post.images.length > 0 && (
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            {post.images.map((image, i) => (
                                <Image
                                    width={500}
                                    height={500}
                                    key={i}
                                    src={image}
                                    alt="Post Image"
                                    className="w-full max-h-[44vh] object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    )}
                    {/* Render videos if present */}
                    {post.videos.length > 0 && (
                        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
                            {post.videos.map((video, i) => (
                                <video key={i} controls className="w-full max-h-[44vh] rounded-lg">
                                    <source src={video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                        </div>
                    )}

                    {/* Icons for likes and comments */}
                    <div className="flex items-center gap-x-4 mt-4">
                        {/* Like button with animation and hover effect */}
                        <div className="flex items-center">
                            <motion.div
                                whileHover={{
                                    scale: 1.2,
                                    backgroundColor: "#df474754",
                                    borderRadius: "50%",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                }}
                                className="p-2 cursor-pointer"
                            >
                                {post.likes.includes(currentUserId) ? (
                                    <FaHeart className="text-red-500 hover:text-red-600" />
                                ) : (
                                    <FaRegHeart className="text-gray-400 hover:text-red-500" />
                                )}
                            </motion.div>
                            <span className="font-semibold">{post.likes.length}</span>
                        </div>

                        {/* Comment button with animation and hover effect */}
                        <div className="flex items-center">
                            <motion.div
                                whileHover={{
                                    scale: 1.2,
                                    backgroundColor: "#d1e7ff75",
                                    borderRadius: "50%",
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 15,
                                }}
                                className="p-2 cursor-pointer"
                                onClick={() => toggleComments(post._id)}
                            >
                                <FaRegComment className="text-gray-400 hover:text-blue-500" />
                            </motion.div>
                            <span className="font-semibold">{post.comments.length}</span>
                        </div>
                    </div>
                    {/* Conditional rendering for comments */}
                    {showComments[post._id] && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-2 pt-2 space-y-2 border-t border-neutral-700"
                        >
                            {/* <h3 className="font-semibold">Comments</h3> */}
                            {post.comments.length > 0 && post.comments.map((comment) => (
                                <div key={comment._id} className="text-white text-sm">
                                    <span className="font-semibold">{comment.userInfo}:</span> {comment.comment}
                                </div>
                            ))}
                            {post.comments.length === 0 && (
                                <span className="text-white text-sm font-semibold">
                                    No comments to show
                                </span>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            ))}
        </div>
    )
}

export default Post
