import axios from "axios";

export const createPost = async (token: string, body: any) => {
  try {
    const createdPostRes = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/createPost`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("createdPostRes: ", createdPostRes.data);
    return { res: createdPostRes.data, error: false };
  } catch (error) {
    console.log("Error liking post: ", error);
    return { res: error, error: true };
  }
};

export const likePost = async (token: string, postId: string) => {
  try {
    const likePostRes = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postId}/likePost`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("likePostRes: ", likePostRes.data);
    return { res: likePostRes.data, error: false };
  } catch (error: any) {
    console.log("Error creating post: ", error);
    if (error.status === 400) return { res: "Already Liked", error: true };
    return { res: error, error: true };
  }
};

export const commentPost = async (
  token: string,
  postId: string,
  comment: string
) => {
  try {
    const commentPostRes = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/${postId}/commentPost`,
      { comment },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("commentPostRes: ", commentPostRes.data);
    return { res: commentPostRes.data, error: false };
  } catch (error: any) {
    console.log("Error commenting post: ", error);
    return { res: error, error: true };
  }
};
