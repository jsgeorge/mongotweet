import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import jwtDecode from "jwt-decode";

//import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import LikeTweetButton from "./like";
import FavoriteButton from "./favorite";
import NewCommentForm from "./comment";

const UserCommands = ({ id, author }) => {
  //const [state, dispatch] = useContext(UserContext);
  const { user, setuser } = useContext(UserContext);
  const [setError] = useState("");
  //const [user, setuser] = useState({});
  const [userlikes, setuserlikes] = useState([{}]);
  const [displayname, setdisplayname] = useState("");

  useEffect(() => {
    //  const setAuthUser = async (token) => {
    // const response = await axios.post("/users/id", { id: token.id });
    // dispatch({
    //     type: "SET_USER",
    //     payload: response.data,
    // });
    // };
    // if (localStorage.jwtToken){
    //     console.log('User is authenticted')
    //     setAuthUser(jwtDecode(localStorage.getItem("jwtToken")));
    // }
    // //if (state.user && state.user[0]) {
    //   setuser(state.user[0].user);
    //   setuserlikes(state.user[0].user.likes);
    //   if (state.user[0].user.username) {
    //     setdisplayname(state.user[0].user.username);
    //   } else {
    //     setdisplayname(
    //       state.user[0].user.name + " " + state.user[0].user.lastname
    //     );
    //   }
    if (user) {
      setuserlikes(user.likes);
      if (user.username) {
        setdisplayname(user.username);
      } else {
        setdisplayname(user.name + " " + user.lastname);
      }
    }
  }, []);
  return (
    <div>
      {user && user._id && user._id != author ? (
        <div className="tweet-user-section">
          <div className="tweet-user-buttons">
            <div className="button_wrap">
              <LikeTweetButton id={id} userlikes={userlikes} />
            </div>

            {/* <div className="button_wrap">
              <FavoriteButton id={id} uid={state.user[0].user._id} />
            </div> */}
          </div>

          <NewCommentForm id={id} user={user} />
        </div>
      ) : null}
    </div>
  );
};

export default UserCommands;
