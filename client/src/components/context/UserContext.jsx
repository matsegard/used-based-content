import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  setIsSignedIn: false,
  login: () => {},
});

const UserProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  function login() {
    setIsSignedIn(true);
  }

  return (
    <UserContext.Provider value={{ isSignedIn, setIsSignedIn, login }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
