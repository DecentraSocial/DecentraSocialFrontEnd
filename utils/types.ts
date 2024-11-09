export type Comment = {
  userInfo: string;
  comment: string;
};

export type PostType = {
  _id: string;
  userId: string;
  username: string;
  userPic: string;
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
  updatedAt: string;
};

type Post = {
  _id: string;
  userId: string;
  post: string;
  images: string[];
  videos: string[];
  likes: string[];
  comments: Comment[];
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
