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
import Avatar from "../user/avatar";

export default function TweetDetail({ tweet }) {
  const [state, dispatch] = useContext(TweetContext);
  // const [isAuthenticted, setIsAuthenticated] = useState(false);
  const [setError] = useState("");
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {}, []);

  const renderCardImage = (images) => {
    return images[0].url;
  };
  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };
  //if (error) return <Redirect to="/auth/signin" />;

  if (!tweet)
    return (
      <div className="card_item_wrapper">
        <p>Cannot display the current tweet</p>
      </div>
    );

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
  } = tweet;

  return (
    <div className="tweet-detail-wrapper">
      <div className="card-text-det">
        <Link to="/tweets" className="backlink">
          <FontAwesomeIcon
            icon={faLongArrowAltLeft}
            size="lg"
            className="primary-clr"
          />{" "}
          Tweet
        </Link>

        <div className="avatar-wrapper">
          <Avatar images={avatar} />
        </div>
        <strong>
          {" "}
          <Link to={`/tweets/query/${tag}`} className="tag-link">
            <strong>
              {"#"}
              {tag ? tag : null}
            </strong>
          </Link>{" "}
        </strong>
        {author ? <AuthorDetail author={author} type="tweet" /> : null}
        <span className="chat-date"> {displayDate(createdAt)}</span>

        {text ? <span className="chat-text-det">{text}</span> : null}
      </div>
      <div className="card-detail-image">
        {images && images.length > 0 && images[0].url ? (
          <div
            className="image"
            style={{
              background: `url(${renderCardImage(images)}) no-repeat`,
            }}
          />
        ) : null}
      </div>
      <div className="tweet-detail">
        <div className="actions">
          Comments {comments ? comments.length : "0"} Likes:{" "}
          {likes ? likes : "0"}
        </div>
        <UserEditCommands id={_id} author={author} />

        <UserCommands id={_id} author={author} />
        <div className="comments">
          {comments && comments.length > 0 ? (
            <span>
              {comments.map((c) => (
                <span key={c.uid}>
                  <strong>
                    <AuthorDetail author={c.uid} type="comment" />
                  </strong>{" "}
                  <span className="comment-text-det">{c.text}</span>
                </span>
              ))}
            </span>
          ) : (
            <p> No comments yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
