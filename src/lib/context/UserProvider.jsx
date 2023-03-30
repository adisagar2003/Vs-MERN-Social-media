import { FC, useState } from "react";
import { UserContext, UserDispatchContext } from "./UserContext";

export const TasksProvider = ({children})=> {
    const [userData, setUserData] = useState({});
  
    return (
      <UserContext.Provider value={userData}>
        <UserDispatchContext.Provider value={setUserData} >
          {children}
        </UserDispatchContext.Provider>
      </UserContext.Provider>
    );
  }