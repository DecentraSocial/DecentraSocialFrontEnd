"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import { checkFollowerFollowing } from "@/utils/utils";
import { PostType, ProfileType } from "@/utils/types";
import { followUser, getAllUsers } from "@/utils/profile";
import { getAllPosts } from "@/utils/home";
import UserCard from "@/components/ui/UserCard";
import Post from "@/components/user/Post";
import Loading from "@/components/ui/Loading";

const ExplorePage = () => {
    const { user: currentUser, setUser: setCurrentUser, token, followers, following, setFollowing } = useUser();
    const [activeTab, setActiveTab] = useState("users");
    const [users, setUsers] = useState<ProfileType[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [allPosts, setAllPosts] = useState<PostType[]>([]);

    useEffect(() => {
        fetchData();
    }, [token, currentUser]);
    const fetchData = async () => {
        try {
            if (token) {
                const usersRes = await getAllUsers();
                if (!usersRes.error) {
                    // Filter out the current user from the users list
                    const filteredUsers = usersRes.res.users.filter(
                        (user: ProfileType) => user._id !== currentUser?._id
                    );
                    setUsers(filteredUsers);
                } else
                    toast.error("Error fetching all users!")

                const postsRes = await getAllPosts();
                if (!postsRes.error) {
                    // Sort posts by most recent first (descending order of createdAt)
                    const sortedPosts = postsRes.res.posts.sort((a: any, b: any) => {
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                    });
                    setAllPosts(sortedPosts);
                }
                else
                    toast.error("Error fetching all posts!")

                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error fetching explore data:", error);
        }
    };

    const handleFollow = async (userToFollow: ProfileType) => {
        const body = {
            Username: userToFollow.username
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
                        picture: userToFollow!.picture,
                        nullifier: "",
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    }
                ]);
            }
            // Update the count of following of current user
            setCurrentUser((prevUser) => {
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
            toast.error(`Could not follow ${userToFollow.username}. Try again.`)
    };

    const handleUnfollow = async (userId: string) => {

    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredPosts = allPosts.filter(post =>
        post.post.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="ml-10 md:ml-20 p-8 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
            {/* Tab navigation */}
            <motion.div
                className="flex gap-4 text-white border-b border-neutral-700 pb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {["users", "posts"].map((tab) => (
                    <motion.div
                        key={tab}
                        className={`cursor-pointer ${activeTab === tab ? "font-bold border-b-2 border-blue-500" : ""}`}
                        onClick={() => setActiveTab(tab)}
                        whileHover={{ scale: 1.1 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </motion.div>
                ))}
            </motion.div>

            {/* Search bar */}
            <motion.input
                type="text"
                placeholder={`Search ${activeTab}...`}
                className="p-2 rounded-lg bg-neutral-700 text-white border border-neutral-600 focus:outline-none mt-4"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            />

            {/* Tab content */}
            <motion.div
                className="mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {activeTab === "users" && (
                    filteredUsers.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredUsers.map(user => (
                                <UserCard
                                    key={user._id}
                                    user={user}
                                    isFollowing={checkFollowerFollowing(user._id, "following", followers, following)!} // if the current user follows the filteredUser
                                    isFollowedBy={checkFollowerFollowing(user._id, "follower", followers, following)!} // if the filteredUser follows the current user
                                    onFollow={() => handleFollow(user)}
                                    onUnfollow={(userId) => handleUnfollow(userId)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-white">No users found.</div>
                    )
                )}
                {activeTab === "posts" && (
                    filteredPosts.length > 0 ? (
                        <Post token={token!} posts={filteredPosts} currentUserId={currentUser?._id || ""} setPosts={setAllPosts} isProfilePage={false} />
                    ) : (
                        <div className="text-white">No posts found.</div>
                    )
                )}
            </motion.div>
        </div>
    );
};

export default ExplorePage;
