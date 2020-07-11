import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../context/user-context";
import FileUpload from "../utils/fileupload";
import Avatar from "./avatar";
import UserCard from "./card";
import Categories from "../categories";
//import jwtDecode from "jwt-decode";
import TweetListing from "../tweets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import FollowingListing from "./following";
import LikeListing from "./likes";

// import jwtDecode from "jwt-decode";
// import axios from "axios";

const ProfilePage = ({ match }) => {
  const [redirect, setRedirect] = useState(false);
  // const [state, dispatch] = useContext(UserContext);
  const { user, setuser, isloggedin, setisloggedin } = useContext(UserContext);
  const [formSuccess, setFormSucess] = useState(false);
  const [otheruser, setotheruser] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // console.log("in profile user._id", user._id);

    if (match.params.id) {
      // console.log("another user id", match.params.id);
      const getUser = async () => {
        try {
          const response = await axios.get(`/users/id?id=${match.params.id}`);
          setotheruser(response.data.userdata);
        } catch (error) {
          console.log("ERROR", error);
          setError("unknown user");
        }
      };
      getUser();
    }
  }, [match.params.id]);

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

  const displayUserProfile = () => {
    let usr = {};
    if (!match.params.id) {
      console.log("profile current user", user._id, user);
      usr = user;
    } else {
      console.log("profile other user", match.params.id, otheruser);
      usr = otheruser;
    }
    const { name, lastname, username, images, email } = usr;
    return (
      <span>
        <h5>
          {images && images.length > 0 ? (
            <Avatar images={images} size="avt-lg" />
          ) : null}

          <strong>
            {!username && name ? name + " " + lastname : username}
          </strong>
        </h5>
        {user && name ? name + " " + lastname : null}
        <h6>{email}</h6>
      </span>
    );
  };
  if (!isloggedin) return <Redirect to="/" />;
  if (redirect) return <Redirect to="/" />;

  // const { name, lastname, username, images, email } = otheruser;
  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          {user ? <UserCard user={user} /> : null}
        </div>

        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-9 content">
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

            <div>{displayUserProfile()}</div>

            {!match.params.id ? (
              <span>
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
              </span>
            ) : null}
            <br />
            {!match.params.id ? (
              <div>
                <strong>Likes</strong> {user.likes ? user.likes.length : 0}{" "}
                <strong>Following</strong>
                {user.following ? user.following.length : 0}
              </div>
            ) : null}

            <div className="usertweets">
              <h5>
                <strong>
                  {!match.params.id ? "Your Tweets" : "Latest Tweets"}
                </strong>
              </h5>
              <div>
                {!match.params.id ? (
                  <TweetListing uid={user._id} />
                ) : (
                  <TweetListing uid={match.params.id} />
                )}
              </div>
            </div>

            {!match.params.id ? (
              <div className="userfollowing">
                <h5>
                  {" "}
                  <strong>Following</strong>{" "}
                </h5>
                {user.following ? (
                  <FollowingListing following={user.following} />
                ) : (
                  "Nobody following yet"
                )}
              </div>
            ) : null}

            {/*  {!match.params.id ? (
              <div className="userfollowing">
                <h5>
                  {" "}
                  <strong>Likes</strong>{" "}
                </h5>
                {user.likes ? (
                  <LikeListing likes={user.likes} />
                ) : (
                  "No likes yet"
                )}
              </div>
            ) : null} */}
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
