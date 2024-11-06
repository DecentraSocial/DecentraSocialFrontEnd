"use client";

import { useState } from 'react';
import StarsCanvas from '../StarBackground'
import Image from 'next/image';
import Link from 'next/link';

const Signup = () => {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [picture, setPicture] = useState<File | null>();
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

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="rounded px-3 py-2 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Enter your bio"
                    className="rounded px-3 py-2 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <input
                    id="file-upload-handle"
                    type="file"
                    onChange={(e) => setPicture(e.target.files ? e.target.files[0] : null)}
                    className="rounded px-3 py-2 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />

                <div className='flex flex-col items-center gap-y-2'>
                    <button
                        type="button"
                        className="py-2 px-4 button-primary text-center text-white cursor-pointer rounded-lg max-w-[200px]"
                    >
                        Sign Up
                    </button>
                    <p>
                        Already a user?
                        <button className="transform hover:-translate-y-1 transition duration-400 text-purple-300 pl-2">
                            <Link href="/auth/signin">Sign In</Link>
                        </button>

                    </p>
                </div>
            </main>
        </div>
    )
}

export default Signup