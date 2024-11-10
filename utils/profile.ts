import axios from "axios";

export const followUser = async (token: string, body: any) => {
  // req.body mar humko yeh chaiye "Username".
  try {
    const followUser = await axios.put(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/follow`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("followUser: ", followUser.data);
    return { res: followUser.data, error: false };
  } catch (error) {
    console.log("Error in following the user:  ", error);
    return { res: error, error: true };
  }
};

export const getAllUsers = async () => {
  try {
    const allUsersRes = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getAllUsers`
    );
    console.log("allUsersRes: ", allUsersRes.data);
    return { res: allUsersRes.data, error: false };
  } catch (error) {
    console.log("error getting while fetching all the  users ", error);
    return { res: error, error: true };
  }
};
