import React, { useState } from "react";

interface NewChatModalProps {
    following: { id: string; name: string }[];
    onClose: () => void;
    onStartChat: (user: { id: string; name: string }) => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({ following, onClose, onStartChat }) => {
    const [search, setSearch] = useState("");

    const filteredUsers = following.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-lg font-medium">Start New Chat</h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white"
                    >
                        ✖
                    </button>
                </div>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded bg-neutral-700 text-white placeholder-neutral-400 mb-4"
                    placeholder="Search for a user..."
                />
                <div className="space-y-2">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div
                                key={user.id}
                                className="flex items-center justify-between p-2 hover:bg-neutral-700 rounded cursor-pointer"
                                onClick={() => onStartChat(user)}
                            >
                                <span className="text-white">{user.name}</span>
                                <button className="text-blue-600 hover:text-blue-400">
                                    Start Chat
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="text-neutral-400">No users found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewChatModal;
