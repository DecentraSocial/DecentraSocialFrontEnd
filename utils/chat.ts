import axios from "axios";
// NEXT_PUBLIC_SOCKET_IO_URL="http://localhost:4000"

// iss ame kya ho rha ki jaise hi user message mae navigate karega toh yeh function call kar k sidebar jitnae chats k sath loggedinUser associate woh dikh jai.
export const fetchChats = async (token: string) => {
    try {
    const allUserAssociatedChats = await axios.get(
        `${process.env.NEXT_PUBLIC_SOCKET_IO_URL}/chat`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        }
    );
    console.log("allUserAssociatedChats: ", allUserAssociatedChats.data);
    return { res: allUserAssociatedChats.data, error: false };
    } catch (error) {
      console.log("Error getting all posts: ", error);
      return { res: error, error: true };
    }
};


// iss mae jab user message mae navigate karta h tab wha p ek "start new chat" kark ek button jab user wha p click karega aur user select karega toh yeh function call karega taki ek newly chat create ho jai.
export const accessChats=async(token:string,userId:string)=>{
    try{
        // userId -> this is belong to that user which is selected in the dropdown section after clicking on the "start new chat" button.
        const userCreateNewChat=await axios.post(
            `${process.env.NEXT_PUBLIC_SOCKET_IO_URL}/chat`,
            {userId},
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
            }
        );
    }catch(error){
        console.log("Error getting all posts: ", error);
        return { res: error, error: true };
    }
}
  