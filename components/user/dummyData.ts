import { PostType, ProfileType } from "@/utils/types";

// Sample user data
export const profile: ProfileType = {
  _id: "1",
  username: "john_doe",
  bio: "Adventurer, traveler, and photographer.",
  picture: "/temp/sample_profile.jpg",
  followers: 120,
  following: 75,
};

// Dummy data for followers and following
export const followers = [
  { _id: "1", username: "alice_wonder", profilePicture: "/temp/av1.png" },
  { _id: "2", username: "bob_the_builder", profilePicture: "/temp/av2.png" },
  { _id: "3", username: "charlie_chap", profilePicture: "/temp/av3.png" },
];

export const following = [
  { _id: "4", username: "daisy_duke", profilePicture: "/temp/av4.png" },
  { _id: "5", username: "elton_john", profilePicture: "/temp/av5.png" },
  { _id: "6", username: "freddie_mercury", profilePicture: "/temp/av6.png" },
];

// Example post data structure based on postSchema
export const examplePosts = [
  {
    _id: "1",
    userId: "user123",
    username: "john_doe",
    post: "Exploring the mountains! #adventure",
    images: ["/temp/mountain.jpg"],
    videos: [],
    likes: ["user456", "user789"],
    comments: [
      {
        _id: "comment1",
        userInfo: "user456",
        comment: "Wow, that looks amazing!",
      },
    ],
    createdAt: "11/5/2024, 10:03:51 PM",
  },
  {
    _id: "2",
    userId: "user123",
    username: "john_doe",
    post: "Another beautiful sunset 🌅",
    images: [],
    videos: ["/temp/car_video.mp4"],
    likes: ["user789"],
    comments: [],
    createdAt: "11/5/2024, 10:03:51 PM",
  },
  {
    _id: "2",
    userId: "user123",
    username: "john_doe",
    post: "Another beautiful sunset 🌅",
    images: [],
    videos: [],
    likes: ["user789"],
    comments: [],
    createdAt: "11/5/2024, 10:03:51 PM",
  },
];

export const initialPosts = [
  {
    _id: "1",
    userId: "user1",
    username: "Alice Johnson",
    post: "Just came back from an amazing hike in the mountains!",
    createdAt: "11/1/2024, 8:20:15 AM",
    likes: ["user2", "user3"],
    comments: [
      { _id: "c1", userInfo: "John Smith", comment: "Looks amazing!" },
      { _id: "c2", userInfo: "Emma Brown", comment: "Wish I was there!" },
    ],
    images: ["/temp/hike.webp"],
    videos: [],
  },
  {
    _id: "2",
    userId: "user2",
    username: "Mark Stevens",
    post: "Trying out some new recipes today. 🍲 Who else loves experimenting in the kitchen?",
    createdAt: "11/2/2024, 12:34:56 PM",
    likes: ["user1"],
    comments: [],
    images: [],
    videos: [],
  },
  {
    _id: "3",
    userId: "user3",
    username: "Emily Davis",
    post: "Caught this beautiful sunset at the beach last evening 🌅",
    createdAt: "11/3/2024, 6:50:30 PM",
    likes: ["user1", "user2"],
    comments: [
      { _id: "c3", userInfo: "Alice Johnson", comment: "Breathtaking!" },
    ],
    images: ["/temp/sunset.jpg"],
    videos: [],
  },
  {
    _id: "4",
    userId: "user4",
    username: "Chris Martin",
    post: "Exploring video production and editing. Here’s a snippet of my latest project!",
    createdAt: "11/4/2024, 4:10:05 PM",
    likes: [],
    comments: [
      {
        _id: "c4",
        userInfo: "Mark Stevens",
        comment: "Great job, keep it up!",
      },
    ],
    images: [],
    videos: ["/temp/car_video.mp4"],
  },
  {
    _id: "5",
    userId: "user5",
    username: "Sophia Green",
    post: "The little moments matter the most. Spent some quality time reading my favorite book today 📚",
    createdAt: "11/5/2024, 9:15:45 AM",
    likes: ["user3"],
    comments: [],
    images: [],
    videos: [],
  },
  {
    _id: "6",
    userId: "user6",
    username: "Jake Wilson",
    post: "Who’s ready for the upcoming music festival? 🎶 Can’t wait to see everyone there!",
    createdAt: "11/5/2024, 11:23:17 AM",
    likes: ["user4", "user5"],
    comments: [{ _id: "c5", userInfo: "Emily Davis", comment: "I’m excited!" }],
    images: [],
    videos: [],
  },
  {
    _id: "7",
    userId: "user7",
    username: "Liam Smith",
    post: "A quick sneak peek of my newly renovated garden 🌱🌷",
    createdAt: "11/5/2024, 2:40:25 PM",
    likes: [],
    comments: [
      { _id: "c6", userInfo: "Sophia Green", comment: "It looks beautiful!" },
    ],
    images: ["/temp/garden.webp"],
    videos: [],
  },
];
