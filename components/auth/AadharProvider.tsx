"use client";

import { useEffect, useState } from "react";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import Login from "./Login";

const AadharProvider = () => {
    const [ready, setReady] = useState<boolean>(false);
    const [useTestAadhaar, setUseTestAadhaar] = useState<boolean>(false);

    useEffect(() => {
        setReady(true);
    }, []);
    return (
        <>
            {ready ? (
                <AnonAadhaarProvider
                    _useTestAadhaar={useTestAadhaar}
                    _appName="Anon Aadhaar"
                >
                    <Login setUseTestAadhaar={setUseTestAadhaar}
                        useTestAadhaar={useTestAadhaar} />
                </AnonAadhaarProvider>
            ) : null}
            Hello
        </>
    )
}

export default AadharProvider
