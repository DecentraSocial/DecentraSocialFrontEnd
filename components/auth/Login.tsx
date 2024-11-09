import {
    AnonAadhaarProof,
    LogInWithAnonAadhaar,
    useAnonAadhaar,
    useProver,
} from "@anon-aadhaar/react";
import { useEffect, useState } from "react";
import { verify, AnonAadhaarCore } from "@anon-aadhaar/core"; // Import verification function
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { setAuthCookie } from "@/app/setCookie";
import { getNullifierSeed } from "@/utils/nullifierSeed";
import StarsCanvas from "../StarBackground";
import Link from "next/link";
import LabelInputContainer from "../ui/LabelInputContainer";
import { Label } from "../ui/Label";
import { Input } from "../ui/Input";

type LoginProps = {
    setUseTestAadhaar: (state: boolean) => void;
    useTestAadhaar: boolean;
};

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


// fix the logic to check the existence of username before calling the api
const Login = ({ setUseTestAadhaar, useTestAadhaar }: LoginProps) => {
    const [anonAadhaar] = useAnonAadhaar();
    const [, latestProof] = useProver();
    const [username, setUsername] = useState("");
    const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (anonAadhaar.status === "logged-in") {
            console.log(anonAadhaar.status);
            // call the login api
            login();
        }
    }, [anonAadhaar]);
    const login = async () => {
        if (!username)
            toast.error("Enter your username");
        try {
            const body = {
                username,
                latestProof: latestProof ? latestProof : proof,
            }
            console.log("latest proof: ", latestProof)
            console.log(body)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/login`, body);
            console.log("Login res: ", res);

            // Save user session information if logged in successfully
            if (res.data.isLoggedIn) {
                // Save the token in cookies
                setAuthCookie(res.data.token)
                toast.success("Logged in successfully!");
                // Redirect to the home page
                router.push('/home');
            } else {
                toast.error('Login failed. Invalid credentials.');
            }
        } catch (error: any) {
            console.log("Error signing in: ", error);
            if (error.response.data.message === "Anon Aadhaar Proof Invalid")
                toast.error("Could not validate your aadhar. Please try again.");
            else if (error.response.data.message === "User does not exist")
                toast.error("User does not exist");
            else
                toast.error("Login failed. Please try again.");
        }
    }

    const switchAadhaar = () => {
        setUseTestAadhaar(!useTestAadhaar);
    };

    // Function to verify the proof using anon-aadhaar core package
    const handleVerifyProof = async () => {
        if (latestProof) {
            try {
                console.log("latestProof:", typeof latestProof);
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

                <div className='flex flex-col items-center gap-y-4'>
                    {username ? (
                        <LogInWithAnonAadhaar
                            nullifierSeed={getNullifierSeed(username)}
                            fieldsToReveal={["revealAgeAbove18"]}
                        />
                    ) : (
                        <button>
                            Please enter your username to proceed
                        </button>
                    )}

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
