import React from "react";
import "./App.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/layout/header";
import { UserContextProvider } from "./context/user-context";
import { TweetContextProvider } from "./context/tweet-context";
import { CategoryContextProvider } from "./context/category-context";

function App() {
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
