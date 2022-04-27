import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext({
  setIsSignedIn: false,
  login: () => {},
});

const UserProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(Boolean);

  const login = async () => {
    let result = await fetch("/user/login", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      setIsSignedIn(true);
      console.log("inloggad");
    } else {
      setIsSignedIn(false);
      console.log("utloggad");
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <UserContext.Provider value={{ isSignedIn, setIsSignedIn, login }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
