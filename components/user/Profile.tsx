"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import { Following, PostType } from "@/utils/types";
import { getCurrentUserPosts, getFollowersDetails, getFollowingDetails } from "@/utils/user";
import Post from "./Post";
import Loading from "../ui/Loading";
import AlphabetAvatar from "../ui/AlphabetAvatar";


const Profile = () => {
    const [activeTab, setActiveTab] = useState("posts");
    const [hoveringUserId, setHoveringUserId] = useState<string | null>(null);
    const [followers, setFollowers] = useState<Following[]>();
    const [following, setFollowing] = useState<Following[]>();
    const [posts, setPosts] = useState<PostType[]>([]);
    // const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>(
    //     following?.reduce((acc, user) => ({ ...acc, [user._id]: true }), {})
    // );
    const { user, isCurrentUserLoading, token } = useUser();

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        try {
            // Follower details
            const followersRes = await getFollowersDetails(token!)
            if (!followersRes.error) {
                if (followersRes.res.message === "User had 0 followers") {
                    setFollowers([]);
                } else {
                    setFollowers(followersRes.res.followersArrayDetails);
                }
            }
            else
                toast.error("Error fetching followers details.")
            // Following details
            const followingRes = await getFollowingDetails(token!)
            if (!followingRes.error) {
                if (followingRes.res.message === "User had 0 following") {
                    setFollowing([]);
                } else {
                    setFollowing(followingRes.res.followingArrayDetails);
                }
            }
            else
                toast.error("Error fetching following details.")

            // Post details
            const postsRes = await getCurrentUserPosts(token!)
            if (!postsRes.error) {
                // Sort posts by most recent first (descending order of createdAt)
                const sortedPosts = postsRes.res.posts.sort((a: any, b: any) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                setPosts(sortedPosts);
            }
            else
                toast.error("Error fetching post details.")
        } catch (error) {
            console.log("Error getting user details: ", error);
        }
    }

    // Toggle follow/unfollow status for a user
    // const toggleFollow = (userId: string) => {
    //     setFollowStatus((prevStatus) => ({
    //         ...prevStatus,
    //         [userId]: !prevStatus[userId],
    //     }));
    //     console.log("followStatus: ", followStatus)
    //     console.log("hoveringUserId: ", hoveringUserId)
    // };

    // Render post content with media, likes, and comments
    const renderPostContent = () => (
        <Post token={token!} posts={posts!} currentUserId={user!._id} setPosts={setPosts} />
    );

    const renderFollowersFollowing = () => {
        const data = activeTab === "followers" ? followers : following;
        const title = activeTab === "followers" ? "Followers" : "Following";

        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 mt-4"
            >
                <h3 className="text-xl font-bold text-white">{title}</h3>
                {data!.length > 0 ? (
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {data?.map((user, index) => (
                            <motion.div
                                key={user._id}
                                className="flex flex-wrap items-center justify-between gap-2 bg-neutral-800 p-3 rounded-lg text-white"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                            >
                                <div className="flex items-center gap-3">
                                    {user.picture ? (
                                        <Image
                                            width={50}
                                            height={50}
                                            src={user.picture}
                                            alt={user.username}
                                            className="w-12 h-12 rounded-full border border-neutral-700"
                                        />
                                    ) : (
                                        <AlphabetAvatar name={user.username} />
                                    )}
                                    <p className="font-normal md:font-semibold text-sm md:text-base">{user.username}</p>
                                </div>

                                {/* Follow/Unfollow button - only show on Following tab */}
                                {/* {activeTab === "following" && (
                                    <motion.button
                                        onMouseEnter={() => setHoveringUserId(user._id)}
                                        onMouseLeave={() => setHoveringUserId(null)}
                                        whileHover={{
                                            scale: 1.05,
                                            // backgroundColor: followStatus[user._id] ? "#f87171" : "#60a5fa",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        // onClick={() => toggleFollow(user._id)}
                                        className="px-2 md:px-4 py-1 rounded-full text-sm md:text-base md:font-semibold bg-blue-500 text-white"
                                    >
                                        {followStatus[user._id]
                                            ? hoveringUserId === user._id
                                                ? "Unfollow"
                                                : "Following"
                                            : "Follow"}
                                    </motion.button>
                                )} */}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-white">
                        {`${activeTab === "followers" ? "You have no followers yet. Be the first to follow!" : "You are not following anyone yet. Start exploring and connect!"}`}
                    </div>
                )}
            </motion.div>
        );
    };

    if (!user || isCurrentUserLoading || !followers || !following || !posts || !token) {
        return (
            <Loading />
        )
    }

    return (
        <div className="ml-10 md:ml-20 p-2 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
            {/* Profile Header */}
            <motion.div
                className="flex items-center gap-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {user.picture ? (
                    <Image
                        width={100}
                        height={100}
                        src={user.picture}
                        alt="Profile"
                        className="w-24 h-24 rounded-full border border-neutral-700"
                    />
                ) : (
                    <AlphabetAvatar name={user.username} size={100} />
                )}
                <div className="text-white">
                    <h2 className="text-2xl font-bold">{user.username}</h2>
                    <p className="text-neutral-400">{user.bio}</p>
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
                    <span className="font-semibold">{user.followers}</span> Followers
                </div>
                <div className="cursor-pointer" onClick={() => setActiveTab("following")}>
                    <span className="font-semibold">{user.following}</span> Following
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
