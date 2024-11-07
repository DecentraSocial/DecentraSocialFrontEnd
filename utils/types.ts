export type PostType = {
  _id: string;
  userId: string;
  username: string;
  post: string;
  images: string[];
  videos: string[];
  likes: string[];
  comments: {
    _id: string;
    userInfo: string;
    comment: string;
  }[];
  createdAt: string;
};

export type ProfileType = {
  username: string;
  bio: string;
  profilePicture: string;
  followers: number;
  following: number;
};
