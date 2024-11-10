"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import { checkFollowerFollowing } from "@/utils/utils";
import { followUser } from "@/utils/profile";
import Post from "./Post";
import Loading from "../ui/Loading";
import AlphabetAvatar from "../ui/AlphabetAvatar";
import UserCard from "../ui/UserCard";
import { Following } from "@/utils/types";


const Profile = () => {
    const [activeTab, setActiveTab] = useState("posts");
    const [hoveringUserId, setHoveringUserId] = useState<string | null>(null);
    // const [followStatus, setFollowStatus] = useState<{ [key: string]: boolean }>(
    //     following?.reduce((acc, user) => ({ ...acc, [user._id]: true }), {})
    // );
    const { user, setUser, isCurrentUserLoading, token, followers, following, setFollowing, posts, setPosts } = useUser();

    // Toggle follow/unfollow status for a user
    // const toggleFollow = (userId: string) => {
    //     setFollowStatus((prevStatus) => ({
    //         ...prevStatus,
    //         [userId]: !prevStatus[userId],
    //     }));
    //     console.log("followStatus: ", followStatus)
    //     console.log("hoveringUserId: ", hoveringUserId)
    // };


    const handleFollow = async (userToFollow: Following) => {
        // User to follow
        const body = {
            Username: userToFollow?.username
        }
        const followUserRes = await followUser(token!, body);
        if (!followUserRes.error) {
            // Update followings array of current user
            if (userToFollow) {
                setFollowing((prevFollowing) => [
                    ...(prevFollowing || []),
                    {
                        _id: userToFollow!._id,
                        username: userToFollow!.username,
                        bio: userToFollow!.bio,
                        picture: user!.picture,
                        nullifier: "",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }
                ]);
            }
            // Update the count of followings in current user
            setUser((prevUser) => {
                if (prevUser) {
                    return {
                        ...prevUser,
                        following: prevUser.following + 1
                    };
                }
                return prevUser;
            });
        }
        else
            toast.error(`Could not follow ${user?.username}. Try again.`)
    }

    const handleUnfollow = async () => {

    }

    // Render post content with media, likes, and comments
    const renderPostContent = () => (
        <Post token={token!} posts={posts!} currentUserId={user!._id} setPosts={setPosts} isProfilePage={true} />
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
                            <UserCard
                                key={user._id}
                                user={user}
                                isFollowing={checkFollowerFollowing(user._id, "following", followers, following)!} // if the current user follows the filteredUser
                                isFollowedBy={checkFollowerFollowing(user._id, "follower", followers, following)!} // if the filteredUser follows the current user
                                onFollow={() => handleFollow(user)}
                                onUnfollow={(userId) => handleUnfollow()}
                            />
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
        <div className="ml-10 md:ml-20 p-8 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
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
