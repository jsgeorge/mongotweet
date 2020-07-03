import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./../user/avatar";
import SearchTweets from "../tweets/search";

const Header = () => {
  //const [redirect, setRedirect] = useState(false);
  //const [state, dispatch] = useContext(UserContext);
  const [setError] = useState("");
  const {user, setuser} = useContext(UserContext)
  useEffect(() => {
     console.log('Header user:', user);
  });

  const renderCardImage = (images) => {
    return images[0].url;
  };

  return (
    <div className="header">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        style={{
          borderBottom: "1px solid #cddded",
          margin: "0",
          padding: "5px 15px",
        }}
      >
        <div className="container">
          <div className="navbar-header">
            {/* {!state.user && !state.user[0] ? ( */}
           {  user ? (
              <Link to="/">
                 <div className="logo"/>
              </Link>
            ) : (
              <Link to="/tweets">
                <div className="logo"/>
              </Link>
            )}
          </div>
          <div className="navbar-left desktop-search">
            <SearchTweets />{" "}
          </div>
          <div className="navbar-right">
            <Link to="/tweets">
              <FontAwesomeIcon
                icon={faHome}
                size="lg"
                className="primary-clr"
              />{" "}
              <span className="nav-link-lbl"> Home</span>
            </Link>
            <Link to="/tweets/search" className="btnMobileSrch">
              <FontAwesomeIcon
                icon={faSearch}
                size="lg"
                className="primary-clr"
              />
            </Link>
            {/* {state.user && state.user[0] ? ( */}
            {user ? (
              <Link
                to="/tweets/add"
                className="btnAddTweet"
                style={{ background: "transparent", border: "none" }}
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  size="lg"
                  className="primary-clr"
                />
              </Link>
            ) : null}

            {/* { state.user && state.user[0] && state.user[0].user && state.user[0].user.images ? ( */}
                 { user && user.images ? (
              <Link to="/user">
              {/* <Avatar images={state.user[0].user.images} size="avt-sm" />  */}
              <Avatar images={user.images} size="avt-sm"/>
              </Link>
            ) : (
              <Link to="/auth/signin">
                {/* <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  style={{
                    border: "2px solid #aaa",
                    borderRadius: "100px",
                    color: "#aaa",
                  }}
                /> */}
                <span>Signin</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
