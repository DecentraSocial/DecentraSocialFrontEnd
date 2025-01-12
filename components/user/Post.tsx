"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast"; .0
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa6";
import { FaEllipsisV } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { useUser } from "@/context/UserContext";
import { PostType } from "@/utils/types";
import { commentPost, deleteComment, deletePost, likePost } from "@/utils/post";
import AlphabetAvatar from "../ui/AlphabetAvatar";

interface PostProps {
    token: string;
    posts: PostType[];
    currentUserId: string;
    isProfilePage?: boolean,
    setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}

const Post = ({ token, posts, currentUserId, setPosts, isProfilePage }: PostProps) => {
    const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
    const [commentText, setCommentText] = useState<{ [key: string]: string }>({});
    const [showPopover, setShowPopover] = useState<{ [key: string]: boolean }>({});
    const popoverRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const { setPosts: setCurrentUserPosts,user } = useUser()

    // Function to handle clicks outside the popover
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            Object.keys(popoverRef.current).forEach((postId) => {
                if (
                    showPopover[postId] &&
                    popoverRef.current[postId] &&
                    !popoverRef.current[postId]!.contains(event.target as Node)
                ) {
                    setShowPopover((prev) => ({
                        ...prev,
                        [postId]: false,
                    }));
                }
            });
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopover]);

    // Function to toggle comments visibility
    const toggleComments = (postId: string) => {
        setShowComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    // Toggle popover visibility
    const togglePopover = (postId: string) => {
        setShowPopover((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    // Like
    const handleLike = async (postId: string) => {
        const likeRes = await likePost(token, postId);
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
                if (!isProfilePage) {
                    setCurrentUserPosts((prevPosts) =>
                        prevPosts.map(post =>
                            post._id === postId
                                ? { ...post, likes: [...post.likes, currentUserId] }
                                : post
                        )
                    );
                }

                // notification
            } else if (likeRes.res.message === "post has been unliked sucessfully") {
                setPosts((prevPosts) =>
                    prevPosts.map(post =>
                        post._id === postId
                            ? { ...post, likes: post.likes.filter(userId => userId !== currentUserId) }
                            : post
                    )
                );
                if (!isProfilePage) {
                    setCurrentUserPosts((prevPosts) =>
                        prevPosts.map(post =>
                            post._id === postId
                                ? { ...post, likes: post.likes.filter(userId => userId !== currentUserId) }
                                : post
                        )
                    );
                }
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
        const commentRes = await commentPost(token, postId, commentText[postId]);
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

            if (!isProfilePage) {
                setCurrentUserPosts((prevPosts) =>
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
            }

            setCommentText((prev) => ({ ...prev, [postId]: '' }));
        } else {
            toast.error("Error commenting on the post!")
        }
    }

    // Edit
    const handleEdit = async () => {

    }
    // Delete
    const handleDelete = async (postId: string) => {
        const deleteRes = await deletePost(token, postId);
        if (!deleteRes.error) {
            setPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
            if (!isProfilePage)
                setCurrentUserPosts((prevPosts) => prevPosts.filter(post => post._id !== postId));
            toast.success("Post deleted successfully");
        } else {
            console.log(deleteRes)
            if (deleteRes.res.status === 400) {
                toast.error("You are not authorized to delete the post");
                return;
            }
            toast.error("Error deleting the post");
        }
    }

    // Share
    const handleShare = async () => {
    }

    // Delete Comment
    const handleDeleteComment = async (postId: string, commentId: string) => {
        const deleteCommentRes = await deleteComment(token, postId, commentId);
        if (!deleteCommentRes.error) {
            // Remove the deleted comment from the relevant post's comments array
            setPosts((prevPosts) =>
                prevPosts.map(post =>
                    post._id === postId
                        ? {
                            ...post,
                            comments: post.comments.filter(comment => comment._id !== commentId)
                        }
                        : post
                )
            );
            if (!isProfilePage) {
                setCurrentUserPosts((prevPosts) =>
                    prevPosts.map(post =>
                        post._id === postId
                            ? {
                                ...post,
                                comments: post.comments.filter(comment => comment._id !== commentId)
                            }
                            : post
                    )
                );
            }
            toast.success("Comment deleted successfully");
        } else {
            toast.error("Error deleting the comment");
        }
    }
    return (
        <div>
            {posts.length > 0 ? (
                <div className="flex flex-col gap-6 w-full max-w-5xl place-self-center -z-10">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post._id}
                            className="bg-neutral-800 p-4 rounded-lg text-white relative"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {/* Post Header */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    {post.userPic ? (
                                        <Link href={`${post.userId === currentUserId ? "/profile" : `/${post.userId}/profile`}`}>
                                            <Image
                                                width={50}
                                                height={50}
                                                src={post.userPic}
                                                alt="User"
                                                className="w-12 h-12 rounded-full border border-neutral-700"
                                            />
                                        </Link>
                                    ) : (
                                        <Link href={`${post.userId === currentUserId ? "/profile" : `/${post.userId}/profile`}`} >
                                            <AlphabetAvatar name={post.username} />
                                        </Link>
                                    )}
                                    <div>
                                        <p className="font-semibold">
                                            <Link href={`${post.userId === currentUserId ? "/profile" : `/${post.userId}/profile`}`}>
                                                {post.username}
                                            </Link>
                                        </p>
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
                                {/* Three-dot menu */}
                                {/* Remove userId === currentId when implementing share */}
                                {post.userId === currentUserId && (
                                    <div className="relative">
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            onClick={() => togglePopover(post._id)}
                                            className="cursor-pointer p-2"
                                        >
                                            <FaEllipsisV />
                                        </motion.div>
                                        {showPopover[post._id] && (
                                            <motion.div
                                                ref={(el) => {
                                                    popoverRef.current[post._id] = el;
                                                }}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="absolute right-0 mt-2 w-32 bg-neutral-700 text-white rounded-lg shadow-lg p-2"
                                            >
                                                {post.userId === currentUserId && (
                                                    <div>
                                                        <div
                                                            onClick={handleEdit}
                                                            className="hover:bg-neutral-600 p-2 rounded cursor-pointer">
                                                            Edit
                                                        </div>
                                                        <div
                                                            onClick={() => handleDelete(post._id)}
                                                            className="hover:bg-neutral-600 p-2 rounded cursor-pointer">
                                                            Delete
                                                        </div>
                                                    </div>
                                                )}
                                                {/* <div className="hover:bg-neutral-600 p-2 rounded cursor-pointer">
                                                Share
                                            </div> */}
                                            </motion.div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Post Content */}
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

                            {/* Likes and comments */}
                            <div className="flex items-center gap-x-4 mt-4">
                                {/* Like */}
                                <div className="flex items-center" onClick={() => handleLike(post._id)}>
                                    <motion.div
                                        whileHover={{
                                            scale: 1.2,
                                            backgroundColor: "#ec48994d",
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
                                            <FaHeart className="text-rose-500 hover:text-rose-600" />
                                        ) : (
                                            <FaRegHeart className="text-gray-400 hover:text-rose-500" />
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

                                    {/* All comments */}
                                    {post.comments.length > 0 && post.comments.map((comment) => (
                                        <div key={comment._id} className="flex items-center gap-4 justify-between text-white text-sm">
                                            <div className="flex items-center flex-shrink gap-2">
                                                {comment.userInfo && comment.userInfo.picture ? (
                                                    <Image
                                                        width={30}
                                                        height={30}
                                                        src={comment.userInfo.picture}
                                                        alt="User Picture"
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                ) : (
                                                    <AlphabetAvatar name={comment.userInfo && comment.userInfo.username ? comment.userInfo.username : 'A'} size={30} />
                                                )}
                                                <div>
                                                    <span className="font-semibold">
                                                        {comment.userInfo && comment.userInfo.username ? comment.userInfo.username : 'Anonymous'}: &nbsp;
                                                    </span>
                                                    {comment.comment}
                                                </div>
                                            </div>

                                            {/* Delete Button */}
                                            {comment.userInfo?._id === currentUserId && (
                                                <motion.div
                                                    whileHover={{
                                                        scale: 1.2,
                                                        backgroundColor: "#ef44443d",
                                                        borderRadius: "50%",
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 300,
                                                        damping: 15,
                                                    }}
                                                    className="p-2 cursor-pointer"
                                                    onClick={() => handleDeleteComment(post._id, comment._id)}
                                                >
                                                    <AiOutlineDelete className="text-gray-400 hover:text-red-500 w-4 h-4" />
                                                </motion.div>
                                            )}
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
