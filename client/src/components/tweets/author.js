import React, { useContext, useEffect, useState } from "react";
import { TweetContext } from "../../context/tweet-context";
//import jwtDecode from "jwt-decode";
import axios from "axios";

export default function AuthorDetail({ author }) {
  const [state, dispatch] = useContext(TweetContext);
  const [user, setuser] = useState("");
  //const { username, lastname, name } = author;
  const [error, setError] = useState("");

  useEffect(() => {
    
    if (author) {

      const getUser = async () => {
        try {
          const response = await axios.get(`/users/id?id=${author}`);
          dispatch({
            type: "FETCH_AUTHOR",
            payload: response.data,
          });
          // console.log("resp data", response.data);
          setuser(response.data);
        } catch (error) {
          console.log("ERROR", error);
          setError("unknown user");
        }
      };
      getUser();
    } else {
      console.log("Error. Cannot retrieve author userdata. Invalid author");
      setError("Invalid author error");
    }
  }, [author, dispatch]);

  const a = user.userdata;
 
  if (error || !user) return <span>{error}</span>;
  return (
    <span className="tweet-author">
      {" "}
      {"@"} {a.username ? a.username : a.name + " " + a.lastname}
    </span>
  );
}
