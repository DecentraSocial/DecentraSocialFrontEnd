"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaRegImage, FaVideo, FaFaceSmile } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useUser } from "@/context/UserContext";
import { getAllPosts } from "@/utils/home";
import { createPost } from "@/utils/post";
import { PostType } from "@/utils/types";
import { uploadMedia } from "@/utils/utils";
import Post from "./Post";
import GlowButton from "../ui/GlowButton";
import Loading from "../ui/Loading";
import AlphabetAvatar from "../ui/AlphabetAvatar";

const HomeFeed = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    const [newPostText, setNewPostText] = useState<string>("");
    const [selectedImages, setSelectedImages] = useState<File[] | null>(null);
    const [selectedVideos, setSelectedVideos] = useState<File[] | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [imageUrls, setImageUrls] = useState<string[]>();
    const [videoUrls, setVideoUrls] = useState<string[]>();

    const { user, isCurrentUserLoading, token } = useUser();

    useEffect(() => {
        getDetails()
    }, [])
    const getDetails = async () => {
        try {
            // All posts
            const postsRes = await getAllPosts();
            if (!postsRes.error) {
                // Sort posts by most recent first (descending order of createdAt)
                const sortedPosts = postsRes.res.posts.sort((a: any, b: any) => {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                });
                setPosts(sortedPosts);
            }
            else
                toast.error("Error fetching posts.")
        } catch (error) {
            console.log("Error getting home page details: ", error);
        }
    }

    const uploadMediaFiles = async () => {
        setIsUploading(true);
        const uploadedImages: string[] = [];
        const uploadedVideos: string[] = [];

        // Upload images
        if (selectedImages && selectedImages?.length > 0) {
            for (const image of selectedImages!) {
                const url = await uploadMedia(image, "image");
                console.log("URL: ", url)
                if (typeof url === 'string') {
                    uploadedImages.push(url);
                } else {
                    toast.error("Error posting images!")
                }
            }
        }

        // Upload videos
        if (selectedVideos && selectedVideos.length > 0) {
            for (const video of selectedVideos!) {
                const url = await uploadMedia(video, "video");
                if (typeof url === 'string') {
                    uploadedVideos.push(url);
                } else {
                    toast.error("Error posting videos!")
                }
            }
        }

        setImageUrls(uploadedImages);
        setVideoUrls(uploadedVideos);
        setIsUploading(false);
    };


    const handleAddMedia = (media: string, event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            if (media === "image") {
                setSelectedImages(prevImages => [...(prevImages || []), ...filesArray]);
            } else if (media === "video") {
                setSelectedVideos(prevVideos => [...(prevVideos || []), ...filesArray]);
            }
        }
    }

    const handlePostSubmit = async () => {
        if (!newPostText && !selectedImages && !selectedVideos && !imageUrls && !videoUrls) {
            toast.error("Please add some text, an image, or a video before posting!");
            return;
        };

        // Wait for media files to upload
        await uploadMediaFiles(); // Ensure this completes before proceeding

        const body = {
            post: newPostText,
            images: selectedImages ? imageUrls : [],
            videos: selectedVideos ? videoUrls : []
        }

        console.log("Body: ", body)

        const createdPostRes = await createPost(token!, body);

        if (!createdPostRes.error) {
            const newPost: PostType = {
                _id: createdPostRes.res._id,
                userId: user!._id,
                username: user!.username,
                userPic: user!.picture,
                post: createdPostRes.res.post,
                createdAt: createdPostRes.res.createdAt,
                likes: [],
                comments: [],
                images: createdPostRes.res.images,
                videos: createdPostRes.res.videos,
                updatedAt: new Date().toISOString()
            }
            setPosts(prevPosts => [newPost, ...prevPosts]);
            setNewPostText("");
            setSelectedImages(null);
            setSelectedVideos(null);
            toast.success("Post has been created successfully!")
        } else {
            toast.error("Error creating the post. Try again.");
            return
        }
    };

    if (!token || !user || !posts || isCurrentUserLoading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="ml-10 md:ml-20 p-2 md:p-10 rounded-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-6 flex-1 w-[90%] md:w-[93%] h-full">
            {/* Post creation section */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-900 border border-neutral-500 p-4 rounded-lg text-white flex gap-4 w-full max-w-5xl place-self-center items-start"
            >
                {/* User's profile photo */}
                {user.picture ? (
                    <Image
                        width={50}
                        height={50}
                        src="/temp/sample_profile.jpg"
                        alt="User"
                        className="w-12 h-12 rounded-full border border-neutral-700"
                    />
                ) : (
                    <AlphabetAvatar name={user.username} />
                )}

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
                                multiple
                                className="hidden"
                                onChange={(e) => handleAddMedia("image", e)}
                            />
                        </label>
                        <label className="cursor-pointer">
                            <FaVideo className="text-gray-400 hover:text-blue-500" />
                            <input
                                type="file"
                                accept="video/*"
                                multiple
                                className="hidden"
                                onChange={(e) => handleAddMedia("video", e)}
                            />
                        </label>
                        <GlowButton disabled={isUploading} label="Post" onClick={handlePostSubmit} />
                    </div>
                    {selectedImages && selectedImages.length > 0 && (
                        <div className="mt-2 flex flex-col gap-2">
                            <div className="flex flex-wrap text-sm text-neutral-400">
                                Selected Images: &nbsp;
                                <p>{selectedImages.map(image => image.name).join(', ')}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedImages.map((image, index) => (
                                    <div key={index} className="relative">
                                        <img src={URL.createObjectURL(image)} alt="Selected Image" className="w-16 h-16 rounded-lg border border-neutral-700" />
                                        <button onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== index))} className="absolute top-0 right-0 m-2 text-white">
                                            <IoMdClose />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedVideos && selectedVideos.length > 0 && (
                        <div className="mt-2 flex flex-col gap-2">
                            <div className="flex flex-wrap text-sm text-neutral-400">
                                Selected Videos: &nbsp;
                                <p>{selectedVideos.map(video => video.name).join(', ')}</p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {selectedVideos.map((video, index) => (
                                    <div key={index} className="relative">
                                        <div className="relative">
                                            <video className="w-16 h-16 rounded-lg">
                                                <source src={URL.createObjectURL(video)} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            <button onClick={() => setSelectedVideos(selectedVideos.filter((_, i) => i !== index))} className="absolute top-0 right-0 m-2 text-white">
                                                <IoMdClose />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Render posts */}
            <Post token={token} posts={posts} currentUserId={user._id} setPosts={setPosts} />
        </div>
    );
};

export default HomeFeed;
