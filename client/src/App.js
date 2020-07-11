import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/header";
//import { UserContextProvider } from "./context/user-context";
import { UserContext } from "./context/user-context";
import { UsersContext } from "./context/users-context";

import { TweetContextProvider } from "./context/tweet-context";
import { CategoryContextProvider } from "./context/category-context";
import jwtDecode from "jwt-decode";
import axios from "axios";
import setAuthorizationToken from "./utils/setAuthToken";

function App() {
  const [isloggedin, setisloggedin] = useState(false);
  const [user, setuser] = useState({});
  const [users, setusers] = useState({});

  useEffect(() => {
    const setAuthUser = async (token) => {
      const response = await axios.post("/users/id", { id: token.id });
      setuser(response.data.user);
    };

    if (localStorage.jwtToken) {
      console.log("User is authenticted");
      setisloggedin(true);
      setAuthUser(jwtDecode(localStorage.jwtToken));
      setAuthorizationToken(localStorage.jwtToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isloggedin, setisloggedin, user, setuser }}>
      <UsersContext.Provider value={{ users, setusers }}>
        <CategoryContextProvider>
          <TweetContextProvider>
            <BrowserRouter>
              <Header />
              <div className="container page-wrapper">
                <Routes />
              </div>
            </BrowserRouter>
          </TweetContextProvider>
        </CategoryContextProvider>
      </UsersContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
