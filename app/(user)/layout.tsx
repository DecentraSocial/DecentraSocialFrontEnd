// components/Layout.tsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import { BiLogOut, BiSolidDashboard } from "react-icons/bi";
import { LuUser2 } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    const links = [
        {
            label: "Dashboard",
            href: "/home",
            icon: <BiSolidDashboard className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Profile",
            href: "/profile",
            icon: <LuUser2 className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Settings",
            href: "/settings",
            icon: <IoMdSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Logout",
            href: "#",
            icon: <BiLogOut className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
    ];

    return (
        <div className="flex min-h-screen w-full">
            {/* Sidebar */}
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: "Anushka Kohli",
                                href: "/profile",
                                icon: (
                                    <Image
                                        src="/hero.svg"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div>
                </SidebarBody>
            </Sidebar>

            {/* Main content area */}
            <main className="flex-1 p-4 md:p-10 bg-neutral-900 border-l border-neutral-700">
                {children}
            </main>
        </div>
    );
};

export default Layout;

export const Logo = () => (
    <Link href="/" className="flex space-x-2 items-center text-sm text-black py-1 relative z-20 -ml-3">
        <Image alt="DecentraSocial" src="/logo.svg" width={70} height={70} />
        <span className="font-medium text-lg text-white whitespace-pre">DecentraSocial</span>
    </Link>
);

export const LogoIcon = () => (
    <Link href="/" className="h-8 w-8 py-1 relative z-20 -ml-1">
        <Image alt="DecentraSocial" src="/logo.svg" width={500} height={500} />
    </Link>
);
