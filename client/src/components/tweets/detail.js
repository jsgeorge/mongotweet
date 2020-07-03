import React, { useContext, useEffect, useState } from "react";
import Moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TweetContext } from "../../context/tweet-context";
import { UserContext } from "../../context/user-context";
import AuthorDetail from "./author";
import UserCommands from "./userSection";
import UserEditCommands from "./userEditCmds";
import UserCard from "../user/card";
import Categories from "../categories";
import Avatar from '../user/avatar';

export default function TweetDetail({ match }) {
  const [state, dispatch] = useContext(TweetContext);
  // const [isAuthenticted, setIsAuthenticated] = useState(false);
  const [setError] = useState("");
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    // if (!state.user && localStorage.jwtToken) {
    //   try {
    //     setAuthUser(jwtDecode(localStorage.jwtToken));
    //     //setIsAuthenticated(true);
    //   } catch (err) {
    //     setError("Error. Cannot set user. user logged off or time expired");
    //   }
    // }
    const { id } = match.params;
    if (id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`/chats/article?id=${id}`);
          dispatch({
            type: "FETCH_TWEET",
            payload: response.data[0],
          });
          // console.log("detail respnse.data", response.data);
        } catch (err) {
          console.log(err);
          //setError("Cannot retrieve the selected tweet. Network error");
        }
      };
      fetchData();
    } else {
      setError("Cannot retrive selecte tweet");
    }
  
  }, []);
  // const setAuthUser = async (token) => {
  //   const response = await axios.post("/users/id", { id: token.id });
  //   dispatch({
  //     type: "SET_USER",
  //     payload: response.data,
  //   });
  // };
  const renderCardImage = (images) => {
    return images[0].url;
  };
  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };
  //if (error) return <Redirect to="/auth/signin" />;

  if (!state.tweet)
    return (
      <div className="card_item_wrapper">
        <p>Cannot display the current tweet</p>
      </div>
    );
  else {
    //console.log("detail state.tweet=", state.tweet);
    // console.log( "***detail state.tweet.author passed to fetch_author",
    // state.tweet.author
    //);
  }
  const {
    _id,
    author,
    avatar,
    text,
    tag,
    category,
    createdAt,
    images,
    comments,
    likes,
  } = state.tweet;
  if (!state.tweet)
    return <div className="has-error">Cannot retrieve the current tweet.</div>;
  //else console.log("tweet detail", state.tweet);

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-3 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-6 col-md-7 col-sm-8   col-xs-9 content">
          <div className="card-text">
            <Link to="/tweets">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                size="lg"
                className="primary-clr"
              />
            </Link>
             <Avatar images={avatar} />
            <strong>{tag ? tag : null}</strong>
            {author ? <AuthorDetail author={author} /> : null}
            <span className="chat-date"> {displayDate(createdAt)}</span>
            <br />
            {text ? <span className="chat-text-det">{text}</span> : null}
          </div>

          {images && images.length > 0 && images[0].url ? (
            <div
              className="image"
              style={{
                background: `url(${renderCardImage(images)}) no-repeat`,
              }}
            />
          ) : null}

          <div className="card-text">
            <UserEditCommands id={match.params.id} author={author} />
          
            <div className="actions">
              Comments {comments ? comments.length : "0"} Likes:{" "}
              {likes ? likes : "0"}
            </div>

            <UserCommands id={match.params.id} author={author} />
           
            <div className="comments">
              {comments && comments.length > 0 ? (
                <span>
                  <h5>Comments</h5>
                  {comments.map((c) => (
                    <p key={c.id}>
                      <strong>{c.user}</strong> <br /> {c.text}
                    </p>
                  ))}
                </span>
              ) : (
                <p> No comments yet</p>
              )}
            </div>

          </div>
        </div>

        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 Rsidebar">
          <Categories />
        </div>
      </div>
    </div>
  );
}
