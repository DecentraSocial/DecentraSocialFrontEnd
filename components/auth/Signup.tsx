"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import toast from 'react-hot-toast';
import {
    AnonAadhaarProvider,
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    useProver,
} from "@anon-aadhaar/react";
import { setAuthCookie } from "@/app/setCookie";
import { getNullifierSeed } from '@/utils/nullifierSeed';
import { postdetails } from '@/utils/utils';
import StarsCanvas from '../StarBackground'
import LabelInputContainer from '../ui/LabelInputContainer';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

const Signup = () => {
    const [anonAadhaar] = useAnonAadhaar();
    const [, latestProof] = useProver();
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [picture, setPicture] = useState<File | null>();
    const [picUrl, setPicUrl] = useState("");
    const [selectedTab, setSelectedTab] = useState(1);

    const router = useRouter();

    useEffect(() => {
        const setPictureUrl = async (pic: File) => {
            const url = await postdetails(pic);
            if (typeof url === 'string') {
                setPicUrl(url);
            }
        }
        if (picture) {
            setPictureUrl(picture);
        }
    }, [picture])

    useEffect(() => {
        console.log("anonAadhaar: ", anonAadhaar)
        if (anonAadhaar.status === "logged-in") {
            console.log(anonAadhaar.status);
            // call the register api
            if (!username)
                toast.error("Enter your username");
            signup();
        }
    }, [anonAadhaar]);

    const signup = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, {
                username,
                bio,
                picture: picture ? picUrl : "",
                latestProof
            });
            console.log(res)
            // Save user session information if logged in successfully
            if (res.data.isLoggedIn) {
                setAuthCookie(res.data.token)
                toast.success("Signed up successfully!");
                router.push("/home");
            }
        } catch (error: any) {
            console.log("Error signing up: ", error)
            if (error.response.data.message === "User already exists") {
                toast.error("User already exists")
            } else {
                toast.error("Error signing up! Please try again.")
            }
        }
    }

    const handleSubmit = async () => {
        if (!username) {
            toast.error("Please enter a username");
            return;
        }
        try {
            if (picture) {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, {
                    username,
                    bio,
                    picture: picUrl
                });
                console.log(res)
                if (res)
                    router.push("/auth/signin")
            }
        } catch (error: any) {
            console.log("Error signing up: ", error)
            if (error.response.data.message === "User already exists") {
                toast.error("User already exists")
            } else {
                toast.error("Error signing up! Please try again.")
            }
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
            <StarsCanvas className="absolute inset-0 z-0" />

            <main className="flex flex-col items-center gap-8 bg-white/10 text-white rounded-2xl max-w-screen-sm mx-auto p-8 z-10 relative">
                <div className='space-y-1'>
                    <div className='flex items-center justify-center'>
                        <h1 className="font-bold text-2xl text-center">Welcome to DecentraSocial
                        </h1>
                        <Image
                            src="/logo.svg"
                            alt='logo'
                            width={60}
                            height={60}
                        />
                    </div>
                    <p className="text-center">Join the Future of Connection - Where You Own Your Voice</p>
                </div>

                {/* selected tab = 1 */}
                {selectedTab === 1 && (
                    <div className='flex flex-col items-center gap-8'>
                        <LabelInputContainer>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id='username'
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter a unique username"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="bio">Bio</Label>
                            <Input
                                id='bio'
                                type="text"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Enter your bio"
                            />
                        </LabelInputContainer>
                        <LabelInputContainer>
                            <Label htmlFor="picture">Profile Picture</Label>
                            <Input
                                id='picture'
                                type="file"
                                accept=".jpg, .jpeg, .png, .gif, .bmp, .svg"
                                onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
                            />
                        </LabelInputContainer>

                        <div className='flex flex-col items-center gap-y-2'>
                            <button
                                type="button"
                                onClick={() => setSelectedTab(2)}
                                className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
                            >
                                Next
                            </button>
                            <p>
                                Already a user?
                                <button className="transform hover:-translate-y-1 transition duration-400 text-purple-300 pl-2">
                                    <Link href="/auth/signin">Sign In</Link>
                                </button>

                            </p>
                        </div>
                    </div>
                )}

                {/* selected tab = 2 */}
                {selectedTab === 2 && (
                    <div className='flex flex-col items-center gap-8'>
                        <p>Please click on the login button to button to sign up</p>

                        <div className='flex flex-col items-center gap-y-2'>
                            <div className='flex items-center gap-x-4'>
                                <button
                                    type="button"
                                    onClick={() => setSelectedTab(1)}
                                    className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
                                >
                                    Previous
                                </button>
                                {username ? (
                                    // <AnonAadhaarProvider
                                    //     _useTestAadhaar={false}
                                    //     _appName="Anon Aadhaar"
                                    // >
                                    <LogInWithAnonAadhaar
                                        nullifierSeed={getNullifierSeed(username)}
                                        fieldsToReveal={["revealAgeAbove18"]}
                                    />
                                    // </AnonAadhaarProvider>
                                ) : (
                                    <p className='text-red-400'>
                                        Please enter your username to proceed
                                    </p>
                                )}
                            </div>

                            <p>
                                Already a user?
                                <button className="transform hover:-translate-y-1 transition duration-400 text-purple-300 pl-2">
                                    <Link href="/auth/signin">Sign In</Link>
                                </button>
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Signup
