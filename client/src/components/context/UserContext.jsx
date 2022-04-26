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

  function logout() {
    setIsSignedIn(false);
  }

  return (
    <UserContext.Provider value={{ isSignedIn, setIsSignedIn, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
