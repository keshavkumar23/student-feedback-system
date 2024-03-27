import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const UserContext = createContext({});

export default function UserContextProvider({children}){
    const [userType, setUserType] = useState(null);
    const [id, setId] = useState(null);
    const [semester, setSemester] = useState(null);
    useEffect(() => {
        axios.get("/profile").then(response => {
            setUserType(response.data.userType);
            setId(response.data.userId);
            setSemester(response.data.semester);
        })
    }, [])
    // console.log('hell from user context ', fid);
    
    return (
        <UserContext.Provider value={{userType, setUserType, id, setId, semester, setSemester}}>
            {children}
        </UserContext.Provider>
    )
}