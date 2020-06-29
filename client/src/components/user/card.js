import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Avatar from "./avatar";
import { UserContext } from "../../context/user-context";

const UserCard = () => {
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [user, setUser] = useState({});
  // console.log("in usercard user is", user);
  const renderCardImage = (images) => {
    return images[0].url;
  };
  useEffect(() => {
    if (state.user && state.user[0]) setUser(state.user[0].user);
  });
  const onLogout = () => {
    localStorage.clear();
    dispatch({
      type: "LOGOUT_USER",
    });
    setRedirect(true);
  };

  return (
    <div className="user-card">
      {state.user && state.user[0] ? (
        <span>
          <ul className="userlinks">
            <li>
              <Link to="/tweets/explore/">Explore</Link>
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
              <Link to="/tweets/following/">Following</Link>
            </li>
          </ul>

          <div>
            <h4>
              <Avatar images={user.images} size="avt-sm" />
              {!user.username && user.name
                ? user.name + " " + user.lastname
                : null}

              {user.username ? user.username : null}
            </h4>
            <button
              className="btn btn-default btn-sm"
              style={{ marginTop: "20px", color: "#111" }}
              onClick={() => onLogout()}
            >
              Logout
            </button>{" "}
          </div>
        </span>
      ) : (
        <span>
          <Link className="btn btn-primary btnWide" to="/auth/signin">
            Signin
          </Link>{" "}
          <br />
          <Link
            className="btn btn-default btnDefault btnWide"
            to="/auth/signup"
          >
            Signup
          </Link>
        </span>
      )}
    </div>
  );
};

export default UserCard;
