import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import AlphabetAvatar from "@/components/ui/AlphabetAvatar";

interface UserCardProps {
    user: {
        _id: string;
        username: string;
        picture?: string;
    };
    isFollowing: boolean; // If the current user follows this user
    isFollowedBy: boolean; // If this user follows the current user
    onFollow: (userId: string) => void;
    onUnfollow: (userId: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, isFollowing, isFollowedBy, onFollow, onUnfollow }) => {

    const { user: currentUser } = useUser()
    const renderFollowButton = () => {
        if (!isFollowing && !isFollowedBy) {
            return (
                <motion.button
                    className="px-3 py-1 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-150"
                    onClick={() => onFollow(user._id)}
                    whileHover={{ scale: 1.05 }}
                >
                    Follow
                </motion.button>
            );
        } else if (isFollowing && !isFollowedBy) {
            return (
                <motion.button
                    className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-150"
                    onClick={() => onUnfollow(user._id)}
                    whileHover={{ scale: 1.05 }}
                >
                    Following
                </motion.button>
            );
        } else if (!isFollowing && isFollowedBy) {
            return (
                <motion.button
                    className="px-3 py-1 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition-colors duration-150"
                    onClick={() => onFollow(user._id)}
                    whileHover={{ scale: 1.05 }}
                >
                    Follow Back
                </motion.button>
            );
        } else if (isFollowing && isFollowedBy) {
            return (
                <motion.button
                    className="px-3 py-1 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-150"
                    onClick={() => onUnfollow(user._id)}
                    whileHover={{ scale: 1.05 }}
                >
                    Following
                </motion.button>
            );
        }
    };

    return (
        <motion.div
            className="flex items-center justify-between gap-2 p-4 bg-neutral-800 rounded-lg text-white hover:shadow-lg transition-shadow duration-300 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
        >
            <Link href={`${currentUser?._id === user._id ? (`/profile`) : (`/${user._id}/profile`)}`} className="flex items-center gap-3 w-auto">
                {user.picture ? (
                    <Image
                        width={50}
                        height={50}
                        src={user.picture}
                        alt={user.username}
                        className="w-12 h-12 rounded-full border border-neutral-700"
                    />
                ) : (
                    <AlphabetAvatar name={user.username} />
                )}
                <p className="font-semibold">{user.username}</p>
            </Link>
            {/* {user._id !== currentUser?._id && (
                <div className="mt-3 sm:mt-0">{renderFollowButton()}</div>
            )} */}
        </motion.div>
    );
};

export default UserCard;
