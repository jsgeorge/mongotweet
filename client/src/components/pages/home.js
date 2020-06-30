import React, { useEffect, useContext, useState } from "react";
//import { MyButton } from "../utils/button";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";

export default function HomePage() {
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {});

  if (state.user && state.user[0]) return <Redirect to="/tweets" />;

  return (
    <div className="home-wrapper">
      <h1 className="welcome-text primary-clr">Welcome to mongoTweet</h1>
      <div
        className="button_wrapper"
        style={{
          width: "100%",
          paddingTop: "10%",
          paddingBottom: "10%",
          background: "#fff",
        }}
      >
        <div
          className="home-buttons"
          style={{ width: "190px", margin: "0px auto" }}
        >
          {/* <MyButton type="home" title="Login" linkTo="/login" />
          <MyButton type="home" title="Register" linkTo="/Register" /> */}
          <Link
            to="/auth/signin"
            className="btn btn-default btnDefault btnHome  "
          >
            {" "}
            Login
          </Link>
          <Link to="/auth/signup" className="btn btn-primary btnHome ">
            Signup
          </Link>{" "}
        </div>{" "}
      </div>
    </div>
  );
}
