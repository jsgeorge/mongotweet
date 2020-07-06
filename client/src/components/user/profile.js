import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import FileUpload from "../utils/fileupload";
import Avatar from "./avatar";
import UserCard from "./card";
import Categories from "../categories";
//import jwtDecode from "jwt-decode";
import TweetListing from "../tweets/listing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";

// import jwtDecode from "jwt-decode";
// import axios from "axios";

const ProfilePage = () => {
  const [redirect, setRedirect] = useState(false);
  // const [state, dispatch] = useContext(UserContext);
  const { user, setuser, isloggedin, setisloggedin } = useContext(UserContext);
  const [formSuccess, setFormSucess] = useState(false);

  useEffect(() => {
    // const setAuthUser = async (token) => {
    //     const response = await axios.post("/users/id", { id: token.id });
    //     dispatch({
    //         type: "SET_USER",
    //         payload: response.data,
    //     });
    //   };
    //   if (localStorage.jwtToken){
    //       console.log('User is authenticted')
    //       setAuthUser(jwtDecode(localStorage.getItem("jwtToken")));
    //   }
  }, []);

  const onLogout = () => {
    localStorage.clear();
    // dispatch({
    //   type: "LOGOUT_USER",
    // });
    setuser({});
    setisloggedin(false);
    setRedirect(true);
  };

  const renderCardImage = (images) => {
    return images[0].url;
  };

  if (!isloggedin || !user) return <Redirect to="/" />;
  if (redirect) return <Redirect to="/" />;

  const { name, lastname, username, images, email } = user;

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-3 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          {user ? <UserCard user={user} /> : null}
        </div>
        <div className="col-lg-6 col-md-7 col-sm-8 col-xs-9 content">
          <div className="user-page">
            <Link to="/user" className="mobile">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                size="lg"
                className="back-link primary-clr"
              />
            </Link>
            <Link to="/tweets" className="desk">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                size="lg"
                className="back-link primary-clr"
              />
            </Link>
            <h4>User Profile</h4>
            <h5>
              {user && user && user.images.length > 0 ? (
                <Avatar images={user.images} size="avt-lg" />
              ) : null}

              {!user.username && user.name
                ? user.name + " " + user.lastname
                : user.username}
            </h5>
            {user && user.name ? user.name + " " + user.lastname : null}
            <h6>{user ? user.email : null}</h6>
            <button
              className="btn btn-default btn-sm"
              style={{ marginTop: "20px", color: "#111" }}
              onClick={() => onLogout()}
            >
              Logout
            </button>{" "}
            <Link to="/user/edit" className="btn btn-primary btn-sm">
              Edit
            </Link>
            <br />
            <div className="usertweets">
              <h5>Your Tweets</h5>
              <div>
                {user && user._id ? <TweetListing uid={user._id} /> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 Rsidebar">
          <Categories />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
