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
  likes: string[];
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

export type ChatUserType = {
  userId: string;
  username: string;
  picture: string;
};

export type MessageType = {
  messageId: string;
  sender: ChatUserType;
  content: string;
  chatId: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatType = {
  _id: string;
  chatId: string;
  chatName: string;
  users: ChatUserType[];
  latestMessage: MessageType;
  createdAt: string;
  updatedAt: string;
};
