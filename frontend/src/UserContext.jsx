import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export default function UserContextProvider({children}){
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(null);
    useEffect(() => {
        axios.get("/profile").then(response => {
            setUserType(response.data.userType);
            setId(response.data.userId);
        })
    }, []) 
    return (
        <UserContext.Provider value={{userType, setUserType, id, setId}}>
            {children}
        </UserContext.Provider>
    )
}