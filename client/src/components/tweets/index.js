import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import AddTweet from "./add";
import TweetListing from "./listing";
import UserCard from "../user/card";
import Categories from "../categories";
//import UserSignin from "../auth/login";

export default function TweetsPage() {
  const [state, dispatch] = useContext(UserContext);
  //const [isAuthenticted, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  useEffect(() => {
    // console.log("tweets user ", state.user);
    if (!state.user && localStorage.jwtToken) {
      try {
        setAuthUser(jwtDecode(localStorage.jwtToken));
        //setIsAuthenticated(true);
      } catch (err) {
        setError("Error. Cannot set user. user logged off or time expired");
      }
    }
    if (state.user[0]) {
      setUser(state.user[0].user);
    }
  }, []);
  const setAuthUser = async (token) => {
    const response = await axios.post("/users/id", { id: token.id });
    dispatch({
      type: "SET_USER",
      payload: response.data,
    });
  };

  if (error) return <Redirect to="/auth/signin" />;
  // if (state.user) console.log(state.user[0]);
  return (
    // <div className="tweet-wrapper">
    <div className="row">
      <div className="col-lg-3 col-md-3  col-sm-2  Lsidebar">
        <UserCard />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6 content">
        <h4>
          <strong>Home</strong>
        </h4>
        <div className="add-tweet-panel">
          {state.user && state.user[0] ? (
            <AddTweet
              type="desktop"
              uid={state.user[0].user._id}
              username={state.user[0].user.username}
            />
          ) : null}
        </div>
        <TweetListing />
      </div>
      <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar">
        <div className="desktop-categories">
          <Categories />
        </div>
      </div>
    </div>
    // </div>
  );
}
