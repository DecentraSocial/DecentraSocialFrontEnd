"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { ProfileType } from '@/utils/types';
import { getCookie } from '@/app/setCookie';
import { getCurrentUser } from '@/utils/user';
import toast from 'react-hot-toast';

interface UserContextProps {
    user: ProfileType | null;
    token: string | null;
    isCurrentUserLoading: boolean;
    refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<ProfileType | null>(null);
    const [token, setToken] = useState<string>("");
    const [isCurrentUserLoading, setIsCurrentUserLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const tokenData = await getCookie();
                if (tokenData?.value) {
                    setToken(tokenData.value);
                    const userRes = await getCurrentUser(tokenData.value);
                    if (!userRes.error) {
                        setUser(userRes.res);
                    } else {
                        toast.error('Error fetching user details.');
                    }
                }
            } catch (error) {
                console.error('Error loading user details:', error);
            } finally {
                setIsCurrentUserLoading(false);
            }
        };

        fetchUser();
    }, []);

    const refetchUser = async () => {
        if (token) {
            const userRes = await getCurrentUser(token);
            if (!userRes.error) {
                setUser(userRes.res);
            } else {
                toast.error('Error refreshing user details.');
            }
        }
    };

    return (
        <UserContext.Provider value={{ user, token, isCurrentUserLoading, refetchUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
