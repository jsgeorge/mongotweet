import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import FileUpload from "../utils/fileupload";
import Avatar from "./avatar";
import UserCard from "../user/card";
import Categories from "../categories";
//import jwtDecode from "jwt-decode";
import TweetListing from "../tweets/listing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  const [images, setImages] = useState({});
  const [formSuccess, setFormSucess] = useState(false);

  useEffect(() => {
   
  }, []);

  const onLogout = () => {
    localStorage.clear();
    dispatch({
      type: "LOGOUT_USER",
    });
    setRedirect(true);
  };

  const renderCardImage = (images) => {
    return images[0].url;
  };

 
 if (redirect) return <Redirect to="/" />;

  return (
    <div className="user-wrapper">
      <div className="row">
        <div className="col-lg-3 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          {state.user ? <UserCard user={state.user[0]} /> : null}
        </div>
         <div className="col-lg-6 col-md-7 col-sm-8 col-xs-9 content">
          <div className="user-page">
            <h4>User Profile</h4>
            <h5>
              {state.user[0] && state.user[0] ? (
                <Avatar images={state.user[0].user.images} size="avt-lg" />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  style={{
                    border: "2px solid blue",
                    borderRadius: "100px",
                    color: "blue",
                  }}
                />
              )}
              {state.user[0] &&
              !state.user[0].user.username &&
              state.user[0].user.name
                ? state.user[0].user.name + " " + state.user[0].user.lastname
                : null}

              {state.user[0] && state.user[0].user.username
                ? state.user[0].user.username
                : null}
            </h5>
            {state.user[0] && state.user[0].user.name
              ? state.user[0].user.name + " " + state.user[0].user.lastname
              : null}
            <h6>{state.user[0] ? state.user[0].user.email : null}</h6>
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
                {state.user[0] && state.user[0].user._id ? (
                  <TweetListing uid={state.user[0].user._id} />
                ) : null}
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

export default UserPage;
