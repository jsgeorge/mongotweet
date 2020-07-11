import React, { useEffect, useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import FileUpload from "../utils/fileupload";
import Avatar from "./avatar";

export default function UserPage() {
  const { user, setuser, isloggedin, setisloggedin } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    // dispatch({
    //   type: "LOGOUT_USER",
    // });
    setuser({});
    setisloggedin(false);
    setRedirect(true);
  };
  if (!isloggedin || !user) return <Redirect to="/" />;
  if (redirect) return <Redirect to="/" />;

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-3 col-md-3  col-sm-3 Lsidebar"></div>
        <div className=" col-lg-6 col-md-6 col-sm-6 content">
          <div className="user-page">
            <h5>
              {user.images.length > 0 ? (
                <Avatar images={user.images} size="avt-lg" />
              ) : null}
              {!user.username && user.name
                ? user.name + " " + user.lastname
                : user.username}
            </h5>
            <div>
              <ul className="userlinks">
                <li>
                  <Link to="/user/profile">Profile</Link>
                </li>
                <li>
                  <Link to="/tweets/search">Explore</Link>
                </li>
                <li>
                  <Link to="/tweets/Lists/">Lists</Link>
                </li>
                <li>
                  <Link to="/tweets/Messges/">Messages</Link>
                </li>
                <li>
                  <Link to="/tweets/Fvorites/">Favorites</Link>
                </li>
                <li>
                  <Link to="/tweets/Messges/">Nofifications</Link>
                </li>
                <li>
                  <Link to="/tweets/Fvorites/">Bookmarks</Link>
                </li>
                <li>
                  <Link to="/users">Following</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar"></div>
      </div>
    </div>
  );
}
