import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext({
  setIsSignedIn: false,
  login: () => {},
});

const UserProvider = (props) => {
  const [isSignedIn, setIsSignedIn] = useState(Boolean);

  async function login() {
    // let loggedIn = false;
    // let result = await fetch("/user/login", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (result.ok) {
    //   loggedIn = true;
    // }

    // console.log(loggedIn);

    setIsSignedIn(true);
    // console.log(isSignedIn);
  }

  async function logout() {
    // let loggedIn = false;
    // let result = await fetch("/user/login", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (result.ok) {
    //   loggedIn = false;
    // }
    setIsSignedIn(false);
    // console.log(loggedIn);
  }

  return (
    <UserContext.Provider value={{ isSignedIn, setIsSignedIn, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);
