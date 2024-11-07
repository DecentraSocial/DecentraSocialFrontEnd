// components/Layout.tsx
"use client";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <AnonAadhaarProvider
            _useTestAadhaar={false}
            _appName="Anon Aadhaar"
        >
            {children}
        </AnonAadhaarProvider>
    );
};

export default Layout;
