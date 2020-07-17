import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import AddTweet from "../tweets/add";
import { UserContext } from "../../context/user-context";
import { UsersContext } from "../../context/users-context";

import UsersListing from "../users";
import UserCard from "../user/card";
import Categories from "../categories";

export default function UsersPage() {
  const [error, setError] = useState("");
  const { user, isloggedin } = useContext(UserContext);
  const { users, setusers } = useContext(UsersContext);
  
  useEffect(() => {}, []);

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-9 content">
          <div className="content-wrapper">
            <h3>Follow Users</h3>
         
            <UsersListing />
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 Rsidebar">
          {/* <div className="desktop-categories">
            <Categories />
          </div> */}
        </div>
      </div>
    </div>
  );
}
