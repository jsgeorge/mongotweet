import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Avatar from "./../user/avatar";
import jwtDecode from "jwt-decode";
import axios from "axios";
import SearchTweets from "../tweets/search";
const Header = () => {
  //const [redirect, setRedirect] = useState(false);
  const [state, dispatch] = useContext(UserContext);
  //const [images, setImages] = useState({});
  const [user, setUser] = useState({});
  //const [showSearch, setShowSearch] = useState(false);
  //const [ setIsAuthenticated] = useState(false);
  const [setError] = useState("");
  //const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    //  console.log("header user", state.user);
    if (!state.user[0] && localStorage.jwtToken) {
      try {
        setAuthUser(jwtDecode(localStorage.getItem("jwtToken")));
        //setIsAuthenticated(true);
      } catch (err) {
        setError("Error. Cannot set user. user logged off or time expired");
      }
    }
    if (state.user[0]) setUser(state.user[0].user);
    // if (state.user[0]) {
    //console.log("in header - user2 =", state.user[0]);
    //setIsAuthenticated(true);
    //}
  });
  const renderCardImage = (images) => {
    return images[0].url;
  };
  const setAuthUser = async (token) => {
    const response = await axios.post("/users/id", { id: token.id });
    dispatch({
      type: "SET_USER",
      payload: response.data,
    });
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
            {!state.user && !state.user[0] ? (
              <Link to="/">
                <img src="images/logo.jpeg" alt="img" />
              </Link>
            ) : (
              <Link to="/tweets">
                <img src="images/logo.jpeg" alt="img" />
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
                style={{ color: "rgb(17, 47, 184)" }}
              />{" "}
              <span className="nav-link-lbl"> Home</span>
            </Link>
            <Link to="/tweets/search" className="btnMobileSrch">
              <FontAwesomeIcon
                icon={faSearch}
                size="lg"
                style={{ color: "rgb(17, 47, 184)" }}
              />
            </Link>
            {state.user && state.user[0] ? (
              <Link
                to="/tweets/add"
                className="btnAddTweet"
                style={{ background: "transparent", border: "none" }}
              >
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  size="lg"
                  style={{ color: "rgb(17, 47, 184)" }}
                />
              </Link>
            ) : null}

            {state.user && state.user[0] ? (
              <Link to="/user">
                {/* <FontAwesomeIcon
                    icon={faUser}
                    size="lg"
                    style={{
                      border: "2px solid rgb(17, 47, 184)",
                      borderRadius: "100px",
                      color: "rgb(17, 47, 184)",
                    }}
                  /> */}
                <Avatar images={state.user[0].user.images} size="avt-sm" />
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
