import axios from "axios";
export const getFollowersDetails=async(token:string)=>{
    try{
        const followerres=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getAllFollowersDetails`
        ,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })

        console.log("followerres: ", followerres.data)
        return {res:followerres.data, error:false}
    }catch(error){
        console.log("Error getting followers details: ", error)
        return {res:error, error:true}
    }
}

export const getFollowingDetails=async(token:string)=>{
    try{
        const followingres=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getAllFollowingDetails`
        ,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        })
        console.log("followingres: ", followingres.data)
        return {res:followingres.data, error:false}

    }catch(error){
        console.log("Error getting following details: ", error)
        return {res:error, error:true}
    }
}

export const connectWithUsers=async(token:string,body:any)=>{

    // req.body mar humko yeh chaiye "Username".
    try{
        const connectWithUsersRes=await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/follow`,
            body,
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }
        )
        console.log("connectWithUsersRes: ", connectWithUsersRes.data)
        return {res:connectWithUsersRes.data, error:false}
    }catch(error){
        console.log("error getting while connecting with others users ", error);
        return {res:error, error:true}
    }
}


export const getAllUsers=async()=>{
    try{
        const allUsersRes=await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/getAllUsers`)
        console.log("allUsersRes: ", allUsersRes.data)
        return {res:allUsersRes.data, error:false}

    }catch(error){
        console.log("error getting while fetching all the  users ", error);
        return {res:error, error:true}
    }
}