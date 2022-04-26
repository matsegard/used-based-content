import { createContext, useContext, useState } from "react";

export const UserContext = createContext({});

const UserProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  console.log(isSignedIn); // to be deleted

  return (
    <UserContext.Provider value={{ isSignedIn, setIsSignedIn }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(UserContext);
