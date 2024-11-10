import React from 'react'

type AlphabetAvatarProps = {
    name: string;
    size?: number; // Optional size prop for customizing avatar size
};

const AlphabetAvatar: React.FC<AlphabetAvatarProps> = ({ name, size = 50 }) => {
    // Extract the first letters of each word and limit to the first two words
    const initials = name
        .split(' ')
        .filter(Boolean) // Filter out any empty strings in case of extra spaces
        .map(word => word[0].toUpperCase())
        .slice(0, 2)
        .join('');
    return (
        <div
            style={{
                width: size,
                height: size,
                aspectRatio: 1 / 1,
                borderRadius: '50%',
                backgroundColor: '#e0aaff', // Avatar background color
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#10002b', // Text color
                fontSize: size / 2.5, // Adjust font size based on avatar size
                fontWeight: 'bold',
            }}
        >
            {initials}
        </div>
    )
}

export default AlphabetAvatar
