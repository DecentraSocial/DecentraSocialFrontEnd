"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiLogOut } from "react-icons/bi";
import { LuUser2 } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { AiOutlineMessage } from "react-icons/ai";
import { IoHome, IoSearch } from "react-icons/io5";
import { useUser } from "@/context/UserContext";
import { deleteCookie } from "../setCookie";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/Sidebar";
import AlphabetAvatar from "@/components/ui/AlphabetAvatar";
import { FaBell } from "react-icons/fa6";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const { user} = useUser();

    const router = useRouter();

    const deletehandler = async (e: any) => {
        e.preventDefault();
        deleteCookie();
        router.push("/auth/signin");
    }

    const links = [
        {
            label: "Home",
            href: "/home",
            icon: <IoHome className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Messages",
            href: "/messages",
            icon: <AiOutlineMessage className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Notifications",
            href: "/notifications",
            icon: <FaBell className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Explore",
            href: "/explore",
            icon: <IoSearch className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        {
            label: "Profile",
            href: "/profile",
            icon: <LuUser2 className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        },
        // {
        //     label: "Settings",
        //     href: "/settings",
        //     icon: <IoMdSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />,
        // },
    ];

    if (!user)
        return;

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
                            <button className="flex items-center justify-start gap-4 group/sidebar py-2" onClick={(e) => deletehandler(e)}>
                                <BiLogOut className="text-neutral-200 h-5 w-5 flex-shrink-0" />
                                <span className="text-neutral-200 md:text-xl group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">Logout</span>
                            </button>
                        </div>

                    </div>
                    <div>
                        <SidebarLink
                            link={{
                                label: user?.username,
                                href: "/profile",
                                icon: (
                                    user.picture ? (
                                        <Image
                                            src={user.picture}
                                            className="h-7 w-7 flex-shrink-0 rounded-full"
                                            width={50}
                                            height={50}
                                            alt="Avatar"
                                        />
                                    ) : (
                                        <AlphabetAvatar name={user.username} size={30} />
                                    )
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
    <Link href="/" className="flex space-x-1 items-center text-black py-1 relative z-20 -ml-3">
        <Image alt="DecentraSocial" src="/logo.svg" width={70} height={70} />
        <span className="font-medium md:font-semibold text-lg md:text-2xl text-white whitespace-pre">DecentraSocial</span>
    </Link>
);

export const LogoIcon = () => (
    <Link href="/" className="h-8 w-8 py-1 relative z-20 -ml-1">
        <Image alt="DecentraSocial" src="/logo.svg" width={500} height={500} />
    </Link>
);
