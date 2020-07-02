import React, {useState, useContext} from "react";
import "./App.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/header";
import { UserContextProvider } from "./context/user-context";
import { TweetContextProvider } from "./context/tweet-context";
import { CategoryContextProvider } from "./context/category-context";
import jwtDecode from "jwt-decode";
import axios from "axios";

function App() {
 //  const [state, dispatch] = useContext(UserContext);
 
  if (localStorage.jwtToken){
    console.log('User is authenticted')
    //setAuthUser(jwtDecode(localStorage.getItem("jwtToken")));
  }
  //  const setAuthUser = async (token) => {
  //   const response = await axios.post("/users/id", { id: token.id });
  //   dispatch({
  //     type: "SET_USER",
  //     payload: response.data,
  //   });
 // };
  return (
    <UserContextProvider>
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
    </UserContextProvider>
  );
}

export default App;
