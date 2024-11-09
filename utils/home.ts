import axios from "axios";

export const getAllPosts = async () => {
  try {
    const allPostsRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/getAllPosts`
    );
    console.log("allPostsRes: ", allPostsRes.data);
    return { res: allPostsRes.data, error: false };
  } catch (error) {
    console.log("Error getting all posts: ", error);
    return { res: error, error: true };
  }
};
