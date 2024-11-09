"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; .0
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa6";
import { getCookie } from "@/app/setCookie";
import { PostType } from "@/utils/types";
import { commentPost, likePost } from "@/utils/post";
import AlphabetAvatar from "../ui/AlphabetAvatar";
import LabelInputContainer from "../ui/LabelInputContainer";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";
import GlowButton from "../ui/GlowButton";

interface PostProps {
    posts: PostType[];
    currentUserId: string;
    setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}

const Post = ({ posts, currentUserId, setPosts }: PostProps) => {
    const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
    // Function to toggle comments visibility
    const toggleComments = (postId: string) => {
        setShowComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    // Like
    const handleLike = async (postId: string) => {
        const token = await getCookie();
        const likeRes = await likePost(token!.value, postId);
        if (!likeRes.error) {
            // Update the posts state to reflect the new like
            if (likeRes.res.message === "post has been liked sucessfully") {
                setPosts((prevPosts) =>
                    prevPosts.map(post =>
                        post._id === postId
                            ? { ...post, likes: [...post.likes, currentUserId] }
                            : post
                    )
                );
            } else if (likeRes.res.message === "post has been unliked sucessfully") {
                setPosts((prevPosts) =>
                    prevPosts.map(post =>
                        post._id === postId
                            ? { ...post, likes: post.likes.filter(userId => userId !== currentUserId) }
                            : post
                    )
                );
            }
        } else {
            if (likeRes.res === "Already Liked")
                toast.error("You have already liked the post!");
            else
                toast.error("Error liking the post!")
        }
    }
    // Comment
    const handleComment = async (postId: string) => {
        const token = await getCookie();
        const commentRes = await commentPost(token!.value, postId, commentText[postId]);
        if (!commentRes.error) {
            // Update the posts state to reflect the new comment
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? {
                            ...post,
                            comments: [
                                ...post.comments,
                                {
                                    _id: commentRes.res.comment._id,
                                    userInfo: {
                                        _id: currentUserId,
                                        username: commentRes.res.comment.userInfo.username,
                                        bio: commentRes.res.comment.userInfo.bio,
                                        picture: commentRes.res.comment.userInfo.picture,
                                        createdAt: commentRes.res.comment.userInfo.createdAt,
                                        updatedAt: commentRes.res.comment.userInfo.updatedAt,
                                    },
                                    comment: commentRes.res.comment.comment,
                                },
                            ],
                        }
                        : post
                )
            );

            setCommentText((prev) => ({ ...prev, [postId]: '' }));
        } else {
            toast.error("Error commenting on the post!")
        }
    }
    return (
        <div>
            {posts.length > 0 ? (
                <div className="flex flex-col gap-6 w-full max-w-5xl place-self-center">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            className="bg-neutral-800 p-4 rounded-lg text-white"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Post Header */}
                            <div className="flex items-center gap-3 mb-4">
                                {post.userPic ? (
                                    <Image
                                        width={50}
                                        height={50}
                                        src={post.userPic}
                                        alt="User"
                                        className="w-12 h-12 rounded-full border border-neutral-700"
                                    />
                                ) : (
                                    <AlphabetAvatar name={post.username} />
                                )}
                                <div>
                                    <p className="font-semibold">{post.username}</p>
                                    {new Date(post.createdAt).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true,
                                    })}
                                </div>
                            </div>
                            <p className="mb-4">{post.post}</p>
                            {/* Render images if present */}
                            {post.images.length > 0 && (
                                <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                    {post.images.map((image, i) => (
                                        <Image
                                            width={1000}
                                            height={1000}
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

                            {/* likes and comments */}
                            <div className="flex items-center gap-x-4 mt-4">
                                {/* Like */}
                                <div className="flex items-center" onClick={() => handleLike(post._id)}>
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

                                {/* Comment */}
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
                                    {/* New comment */}
                                    <div className="flex items-center gap-2 mt-2 mb-4">
                                        <input
                                            type="text"
                                            className="flex-1 p-2 text-sm rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:outline-none"
                                            placeholder="Write a comment..."
                                            value={commentText[post._id] || ''}
                                            onChange={(e) =>
                                                setCommentText((prev) => ({
                                                    ...prev,
                                                    [post._id]: e.target.value,
                                                }))
                                            }
                                        />
                                        <button
                                            onClick={() => handleComment(post._id)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Comment
                                        </button>
                                    </div>
                                    {/* <h3 className="font-semibold">Comments</h3> */}
                                    {/* All comments */}
                                    {post.comments.length > 0 && post.comments.map((comment) => (
                                        <div key={comment._id} className="text-white text-sm">
                                            <span className="font-semibold">
                                                {comment.userInfo && comment.userInfo.username ? comment.userInfo.username : 'Anonymous'}: &nbsp;
                                            </span>
                                            {comment.comment}
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
            ) : (
                <motion.div
                    className="w-full max-w-5xl rounded-lg text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    No posts yet. Share your first post to start engaging!
                </motion.div>
            )}
        </div>
    )
}

export default Post
