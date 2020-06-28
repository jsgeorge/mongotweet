import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
//import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LikeTweetButton from "./like";
import FavoriteButton from "./favorite";
import NewCommentForm from "./comment";

const UserCommands = ({ id, author }) => {
  const [state, dispatch] = useContext(UserContext);
  const [setError] = useState("");
  const [user, setuser] = useState({});
  const [userlikes, setuserlikes] = useState([{}]);
  const [displayname, setdisplayname] = useState("");
  useEffect(() => {
    if (state.user && state.user[0]) {
      setuser(state.user[0].user);
      setuserlikes(state.user[0].user.likes);
      if (state.user[0].user.username) {
        setdisplayname(state.user[0].user.username);
      } else {
        setdisplayname(
          state.user[0].user.name + " " + state.user[0].user.lastname
        );
      }
    }
  }, []);
  return (
    <div>
      {user && user._id && user._id != author ? (
        <div className="tweet-user-section">
          <div className="tweet-user-buttons">
            <div className="button_wrap">
              <LikeTweetButton id={id} uid={user._id} userlikes={userlikes} />
            </div>

            {/* <div className="button_wrap">
              <FavoriteButton id={id} uid={state.user[0].user._id} />
            </div> */}
          </div>

          <NewCommentForm id={id} uid={user._id} user={displayname} />
        </div>
      ) : null}
    </div>
  );
};

export default UserCommands;
