import React, { useContext, useEffect, useState } from "react";
//import { TweetContext } from "../../context/tweet-context";
//import jwtDecode from "jwt-decode";
import axios from "axios";
import Avatar from "../user/avatar";

export default function AuthorDetail({ author, type }) {
 // const [state, dispatch] = useContext(TweetContext);
  const [user, setuser] = useState("");
  //const { username, lastname, name } = author;
  const [error, setError] = useState("");

  useEffect(() => {
    console.log('author type', type)
    if (author) {

      const getUser = async () => {
        try {
          const response = await axios.get(`/users/id?id=${author}`);
          // dispatch({
          //   type: "FETCH_AUTHOR",
          //   payload: response.data,
          // });
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
  }, [author]);

  if (!user && !user.data) return null;

  const {name, lastname, username, images } =  user.userdata;
 
  if (error || !user) return <span>{error}</span>;
  return (
    <span>
    {type=="tweet" ?
    <span className="tweet-author">
      {" "}
       {username ? username : name + " " + lastname}
    </span>
    :
    <span className="tweet-author">
       <div className="avatar-wrapper">
                <Avatar images={images} size="avt-sm"/>
            </div>
          <div className="tweet-item-wrapper">
       {username ? username : name + " " + lastname}
       </div>
    </span>
    }
    </span>
  );
}
