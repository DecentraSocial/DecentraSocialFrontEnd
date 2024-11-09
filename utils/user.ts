import axios from "axios";

export const getCurrentUser = async (token: string) => {
  try {
    const userRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getMe`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("userRes: ", userRes.data);
    return { res: userRes.data, error: false };
  } catch (error) {
    console.log("Error getting profile page details: ", error);
    return { res: error, error: true };
  }
};

export const getFollowersDetails = async (token: string) => {
  try {
    const followersRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getAllFollowersDetails`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("followersRes: ", followersRes.data);
    return { res: followersRes.data, error: false };
  } catch (error) {
    console.log("Error getting followers details: ", error);
    return { res: error, error: true };
  }
};
export const getFollowingDetails = async (token: string) => {
  try {
    const followingRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getAllFollowingDetails`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("followingRes: ", followingRes.data);
    return { res: followingRes.data, error: false };
  } catch (error) {
    console.log("Error getting following details: ", error);
    return { res: error, error: true };
  }
};

export const getCurrentUserPosts = async (token: string) => {
  try {
    const postsRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/getUserPosts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("postsRes: ", postsRes.data);
    return { res: postsRes.data, error: false };
  } catch (error) {
    console.log("Error getting post details: ", error);
    return { res: error, error: true };
  }
};
