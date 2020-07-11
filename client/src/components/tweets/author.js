import React, { useContext, useEffect, useState } from "react";
//import { TweetContext } from "../../context/tweet-context";
//import jwtDecode from "jwt-decode";
import axios from "axios";
import Avatar from "../user/avatar";

export default function AuthorDetail({ author, tag, type }) {
  // const [state, dispatch] = useContext(TweetContext);
  const [user, setuser] = useState("");
  //const { username, lastname, name } = author;
  const [error, setError] = useState("");

  useEffect(() => {
    if (author) {
      const getUser = async () => {
        try {
          const response = await axios.get(`/users/id?id=${author}`);
          // dispatch({
          //   type: "FETCH_AUTHOR",
          //   payload: response.data,
          // });
          // console.log("user in Author", response.data);
          setuser(response.data);
        } catch (error) {
          // console.log("ERROR", error);
          setError("unknown user");
        }
      };
      getUser();
    } else {
      console.log("Error. Cannot retrieve author userdata. Invalid author");
      setError("Invalid author error");
    }
  }, [author]);

  if (!user && !user.data) return null;

  const { name, lastname, username, images } = user.userdata;

  if (error || !user) return <span>{error}</span>;
  return (
    <span>
      {type == "tweet" ? (
        <span>
          {/* <div className="avatar-wrapper">
            <Avatar images={images} size="avt-sm" />
          </div> */}
          {/* {"@"} */}
          <span className="tweet-author">
            {"@"}
            {username ? username : name + " " + lastname}
          </span>
          {/* <Link to={`/tweets/query/${tag}`} className="tag-link"> */}
          {/* <strong>{tag ? tag : null}</strong> */}
          {/* </Link> */}
        </span>
      ) : (
        <span className="tweet-author">
          <div className="avatar-wrapper">
            <Avatar images={images} size="avt-sm" />
          </div>
          <div className="author-wrapper">
            {username ? username : name + " " + lastname}
          </div>
        </span>
      )}
    </span>
  );
}
