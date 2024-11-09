export type CommentType = {
  _id: string;
  userInfo: {
    _id: string;
    username: string;
    bio: string;
    picture: string;
    nullifier?: string;
    createdAt: string;
    updatedAt: string;
  } | null;
  comment: string;
};

export type PostType = {
  _id: string;
  userId: string;
  username: string;
  userPic?: string;
  post: string;
  images: string[];
  videos: string[];
  likes: string[]; // Array of user IDs who liked the post
  comments: CommentType[];
  createdAt: string;
  updatedAt: string;
};

export type ProfileType = {
  _id: string;
  username: string;
  bio: string;
  picture: string;
  followers: number;
  following: number;
};

export type Following = {
  _id: string;
  username: string;
  bio: string;
  picture: string;
  nullifier: string;
  createdAt: string;
  updatedAt: string;
};
