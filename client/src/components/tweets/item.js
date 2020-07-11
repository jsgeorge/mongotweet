import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import AuthorDetail from "./author";
import Avatar from "../user/avatar";

const TweetItem = ({ tweet }) => {
  const [error, setError] = useState("");
  useEffect(() => {}, []);

  const renderCardImage = (images) => {
    if (images.length > 0) return images[0].url; //images[0].url;
  };

  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };

  const {
    _id,
    author,
    avatar,
    text,
    tag,
    images,
    createdAt,
    comments,
    likes,
  } = tweet;

  return (
    <div className="card_item_wrapper">
      <div className="card-text">
        <div className="avatar-wrapper">
          <Link to={`/user/${author}/profile`}>
            <Avatar images={avatar} />
          </Link>
        </div>

        <div className="tweet-item-wrapper">
          <Link to={`/tweets/query/tag/${tag}`} className="tag-link">
            <strong>
              {"#"}
              {tag ? tag : null}
            </strong>
          </Link>{" "}
          <Link to={`/user/${author}/profile`}>
            <AuthorDetail author={author} type="tweet" />
          </Link>
          <span className="chat-date">{displayDate(createdAt)}</span>
        </div>
        {text ? (
          <Link to={`/tweets/${_id}/view`} className="chat-text">
            {text}{" "}
          </Link>
        ) : null}
      </div>

      {images && images.length > 0 && images[0].url ? (
        <Link to={`/tweets/${_id}/view`}>
          <div
            className="image"
            style={{
              background: `url(${renderCardImage(images)}) no-repeat`,
            }}
          />
        </Link>
      ) : null}

      <div className="actions">
        
        {comments ? (
          <span>
            comments {comments.length} likes: {likes}
          </span>
        ) : (
          <p>NO comments yet</p>
        )}
        {/* <div className="button_wrapp">
                <Link className="card_link" to={`/chat/${_id}`}>
                  More
                </Link>
                </div>*/}
        {/*<div className="button_wrapp">
                <button
                  className="like_link"
                  onClick={() => {
                    //   props.user.userData.isAuth
                    //     ? this.props.dispatch(chatLike(props._id))
                    //     : this.props.history.push("/login");
                    chatLike(_id);
                  }}
                >
                  <FontAwesomeIcon icon={faStar} /> Like
                </button>
              </div>
              <div className="button_wrapp">
                {favorite ? (
                  <button
                    className="add_favorites"
                    onClick={() => {
                      deleteFavorite(_id);
                      setFavorite(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    Delete Favorite
                  </button>
                ) : (
                  <button
                    className="add_favorites"
                    onClick={() => {
                      addFavorite(_id);
                      setFavorite(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                    Add Favorite
                  </button>
                )}
                  </div>*/}
      </div>
    </div>
  );
};

export default TweetItem;
