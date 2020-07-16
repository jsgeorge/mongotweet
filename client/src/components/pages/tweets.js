import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AddTweet from "../tweets/add";
import { UserContext } from "../../context/user-context";
import TweetListing from "../tweets";
import UserCard from "../user/card";
import Categories from "../categories";

export default function TweetsPage() {
  const [error, setError] = useState("");
  const { user, isloggedin } = useContext(UserContext);

  useEffect(() => {}, []);

  if (error) return <Redirect to="/auth/signin" />;
  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-9 content">
          <div className="content-wrapper">
            <h3 className="desk">Home</h3>
          </div>
          <div className="add-tweet-panel">
            {isloggedin && user ? (
              <AddTweet user={user} type="desktop" />
            ) : null}
          </div>
          <TweetListing />
        </div>
        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 Rsidebar">
          <div className="desktop-categories">
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
}
