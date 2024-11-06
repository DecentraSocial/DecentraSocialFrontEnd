import {
    AnonAadhaarProof,
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    useProver,
} from "@anon-aadhaar/react";
import { useEffect, useState } from "react";
import { verify, AnonAadhaarCore } from "@anon-aadhaar/core"; // Import verification function
import Image from "next/image";
import StarsCanvas from "../StarBackground";
import Link from "next/link";

type LoginProps = {
    setUseTestAadhaar: (state: boolean) => void;
    useTestAadhaar: boolean;
};

const Login = ({ setUseTestAadhaar, useTestAadhaar }: LoginProps) => {
    const [anonAadhaar] = useAnonAadhaar();
    const [, latestProof] = useProver();
    const [username, setUsername] = useState("");
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);

    useEffect(() => {
        if (anonAadhaar.status === "logged-in") {
            console.log(anonAadhaar.status);
        }
    }, [anonAadhaar]);

    const switchAadhaar = () => {
        setUseTestAadhaar(!useTestAadhaar);
    };

    const getNullifierSeed = (username: string) => {
        let hash = 0;
        for (let i = 0; i < username.length; i++) {
            hash = hash * 31 + username.charCodeAt(i);
            hash = hash & hash;
        }
        return Math.abs(hash);
    };

    // Function to verify the proof using anon-aadhaar core package
    const handleVerifyProof = async () => {
        if (latestProof) {
            try {
                console.log("latestProof:", latestProof);
                console.log("Claim:", latestProof.claim);
                const anonAadhaarCore = new AnonAadhaarCore("some-id", latestProof.claim, latestProof.proof);
                const isValid = await verify(anonAadhaarCore, useTestAadhaar);
                setVerificationStatus(isValid ? "Proof is verified!" : "Proof verification failed.");
                console.log("isValid", isValid)
            } catch (error) {
                setVerificationStatus("Verification error occurred.");
                console.error("Verification Error:", error);
            }
        }
    };
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
            <StarsCanvas className="absolute inset-0 z-0" />
            <main className="flex flex-col items-center gap-8 bg-white/10 text-white rounded-2xl max-w-screen-sm mx-auto p-8 z-10 relative">
                <div className='space-y-1'>
                    <div className='flex items-center justify-center'>
                        <h1 className="font-bold text-2xl text-center">Welcome back to DecentraSocial
                        </h1>
                        <Image
                            src="/logo.svg"
                            alt='logo'
                            width={60}
                            height={60}
                        />
                    </div>
                    <p className="text-center">Prove your identity anonymously using your Aadhaar card.</p>
                </div>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="rounded px-3 py-2 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className='flex flex-col items-center gap-y-4'>
                    <LogInWithAnonAadhaar
                        nullifierSeed={getNullifierSeed(username)}
                        fieldsToReveal={["revealAgeAbove18"]}
                    />
                    <p>
                        New to DecentraSocial?
                        <button className="transform hover:-translate-y-1 transition duration-400 text-purple-300 pl-2">
                            <Link href="/auth/signup">Sign Up</Link>
                        </button>

                    </p>
                </div>

                {useTestAadhaar ? (
                    <p>
                        You&apos;re using the <strong> test </strong> Aadhaar mode
                    </p>
                ) : (
                    <p>
                        You&apos;re using the <strong> real </strong> Aadhaar mode
                    </p>
                )}
                <button
                    onClick={switchAadhaar}
                    type="button"
                    className="rounded bg-white px-2 py-1 mb-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    Switch for {useTestAadhaar ? "real" : "test"}
                </button>
            </main>
            <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8 z-[2] relative">
                {/* Render the proof if generated and valid */}
                {anonAadhaar.status === "logged-in" && (
                    <>
                        <p className="text-white">✅ Proof is valid</p>
                        <p className="text-white">Got your Aadhaar Identity Proof</p>
                        <p className="text-white">Welcome anon!</p>
                        {latestProof && (
                            <>
                                <div className="text-white flex flex-col items-center gap-y-4 w-full">
                                    <AnonAadhaarProof code={JSON.stringify(latestProof, null, 2)} />
                                </div>
                                <button
                                    onClick={handleVerifyProof}
                                    className="rounded bg-green-500 px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-600 mt-4"
                                >
                                    Verify Proof
                                </button>
                                {verificationStatus && (
                                    <p className="mt-2 text-sm font-semibold text-white">
                                        {verificationStatus}
                                    </p>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Login