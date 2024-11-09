"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from "axios";
import toast from 'react-hot-toast';
import {
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    useProver,
} from "@anon-aadhaar/react";
import { setAuthCookie } from "@/app/setCookie";
import { getNullifierSeed } from '@/utils/nullifierSeed';
import { uploadMedia } from '@/utils/utils';
import StarsCanvas from '../StarBackground'
import LabelInputContainer from '../ui/LabelInputContainer';
import { Label } from '../ui/Label';
import { Input } from '../ui/Input';

const proof = {
    "type": "anon-aadhaar",
    "id": "92b57988-c92f-41b5-8541-776a5f196f0a",
    "claim": {
        "pubKey": [
            "1388327314901276273497603053049831573",
            "1288770065561824590310204825945893597",
            "347944061738351220497875430520412587",
            "2203925894492670478365294907843212566",
            "349976987200639440095663304686403400",
            "1858127966046453767090107272117170604",
            "98944980972575232708304306395068367",
            "72308052871443505790154443070931847",
            "171399417356978051390838864702414084",
            "2253675451749563963224572465143971881",
            "442208872747909568780648632811615762",
            "683454141347236191691262238349526517",
            "1671407496108483722945952438837825234",
            "1087766175397090383868214821691649424",
            "13091038325609962763769551933681621",
            "2021829298345573369225939328286843929",
            "3294796001033061829975954746704750"
        ],
        "signalHash": "10010552857485068401460384516712912466659718519570795790728634837432493097374",
        "ageAbove18": true,
        "gender": null,
        "pincode": null,
        "state": null
    },
    "proof": {
        "groth16Proof": {
            "pi_a": [
                "18899954804066570070478420876020428113331419319671430218000858994938855222008",
                "6691801593129256311271407480792799086776645787549257067668850353846937522807",
                "1"
            ],
            "pi_b": [
                [
                    "7012436179191440130237870514785549126325409958184052180208595171379718643540",
                    "13387654599470660922212914382661881147332967801978400485295004827703101681479"
                ],
                [
                    "16368123913144782992335437975704437679422136033620812718832071328188107380701",
                    "16511818283089870217239008373282613683054168098454399665382402076150305030107"
                ],
                [
                    "1",
                    "0"
                ]
            ],
            "pi_c": [
                "6163498801149870012904019137641691540976106858671196216095763271901415421602",
                "3271972489240148897366887228294541781233141046385806493305415607275260267912",
                "1"
            ],
            "protocol": "groth16",
            "curve": "bn128"
        },
        "pubkeyHash": "18063425702624337643644061197836918910810808173893535653269228433734128853484",
        "timestamp": "1730723400",
        "nullifierSeed": "108274800",
        "nullifier": "1550100262067717086011651207042883666239885390709865158044783080948713742007",
        "signalHash": "10010552857485068401460384516712912466659718519570795790728634837432493097374",
        "ageAbove18": "1",
        "gender": "0",
        "pincode": "0",
        "state": "0"
    }
}

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
            const url = await uploadMedia(pic, "image");
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
            signup();
        }
    }, [anonAadhaar]);

    const signup = async () => {
        if (!username)
            toast.error("Enter your username");
        console.log("latestProof: ", latestProof)
        try {
            if (latestProof) {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`, {
                    username,
                    bio,
                    picture: picture ? picUrl : "",
                    // latestProof,
                    latestProof: latestProof !== undefined ? latestProof : proof,
                });
                console.log(res)
                // Save user session information if logged in successfully
                if (res.data.isLoggedIn) {
                    setAuthCookie(res.data.token)
                    toast.success("Signed up successfully!");
                    router.push("/home");
                }
            } else {
                toast.error("Proof could not be generated. Try again.")
                return;
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
                                    <LogInWithAnonAadhaar
                                        nullifierSeed={getNullifierSeed(username)}
                                        fieldsToReveal={["revealAgeAbove18"]}
                                    />
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
