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
    console.log("Error creating post: ", error);
    return { res: error, error: true };
  }
};
