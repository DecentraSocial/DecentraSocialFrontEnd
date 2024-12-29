"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Following, PostType, ProfileType } from '@/utils/types';
import { getCookie } from '@/app/setCookie';
import { getCurrentUser, getCurrentUserPosts, getFollowersDetails, getFollowingDetails } from '@/utils/user';
import toast from 'react-hot-toast';
import { Socket } from 'socket.io-client';

interface UserContextProps {
    user: ProfileType | null;
    followers: Following[] | null;
    following: Following[] | null;
    posts: PostType[];
    token: string | null;
    isCurrentUserLoading: boolean;
    setUser: React.Dispatch<React.SetStateAction<ProfileType | null>>;
    setFollowers: React.Dispatch<React.SetStateAction<Following[] | null>>;
    setFollowing: React.Dispatch<React.SetStateAction<Following[] | null>>;
    setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
    refetchUser: () => Promise<void>;
    socket:Socket | null;
    setSocket:React.Dispatch<React.SetStateAction<Socket | null>>
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<ProfileType | null>(null);
    const [token, setToken] = useState<string>("");
    const [isCurrentUserLoading, setIsCurrentUserLoading] = useState<boolean>(true);
    const [followers, setFollowers] = useState<Following[] | null>(null);
    const [following, setFollowing] = useState<Following[] | null>(null);
    const [posts, setPosts] = useState<PostType[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const tokenData = await getCookie();
                if (tokenData?.value) {
                    setToken(tokenData.value);

                    // User Details
                    const userRes = await getCurrentUser(tokenData.value);
                    if (!userRes.error) {
                        setUser(userRes.res);
                    } else {
                        toast.error('Error fetching user details.');
                    }

                    // Follower details
                    const followersRes = await getFollowersDetails(tokenData.value);
                    if (!followersRes.error) {
                        if (followersRes.res.message === "User had 0 followers") {
                            setFollowers([]);
                        } else {
                            setFollowers(followersRes.res.followersArrayDetails);
                        }
                    } else {
                        toast.error("Error fetching followers details.");
                    }

                    // Following details
                    const followingRes = await getFollowingDetails(tokenData.value);
                    if (!followingRes.error) {
                        if (followingRes.res.message === "User had 0 following") {
                            setFollowing([]);
                        } else {
                            setFollowing(followingRes.res.followingArrayDetails);
                        }
                    } else {
                        toast.error("Error fetching following details.");
                    }

                    // Post details
                    const postsRes = await getCurrentUserPosts(tokenData.value);
                    if (!postsRes.error) {
                        const sortedPosts = postsRes.res.posts.sort((a: any, b: any) => {
                            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        });
                        setPosts(sortedPosts);
                    } else {
                        toast.error("Error fetching post details.");
                    }
                }
            } catch (error) {
                console.error('Error loading user details:', error);
            } finally {
                setIsCurrentUserLoading(false);
            }
        };

        fetchUser();
    }, []);

    const refetchUser = async () => {
        if (token) {
            try {
                const userRes = await getCurrentUser(token);
                if (!userRes.error) {
                    setUser(userRes.res);
                } else {
                    toast.error('Error refreshing user details.');
                }
            } catch (error) {
                console.error('Error refetching user details:', error);
            }
        }
    };

    return (
        <UserContext.Provider
            value={{
                user,
                followers,
                following,
                posts,
                token,
                isCurrentUserLoading,
                setUser,
                setFollowers,
                setFollowing,
                setPosts,
                refetchUser,
                socket,
                setSocket
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
