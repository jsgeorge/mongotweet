import React, { useContext, useEffect, useState } from "react";
import { TweetContext } from "../../context/tweet-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const LikeTweetButton = ({ id, uid, userlikes }) => {
  const [state, dispatch] = useContext(TweetContext);
  const [error, setError] = useState("");
  const [like, setLike] = useState(false);

  useEffect(() => {
    if (userlikes && userlikes.length > 0)
      userlikes.map((l) => {
        if (l.id === id) {
          setLike(true);
        }
      });
  }, []);

  const handleStar = () =>
    like ? (
      <FontAwesomeIcon
        icon={faStar}
        style={{ marginLeft: "4px" }}
        className="primary-clr"
      />
    ) : (
      <FontAwesomeIcon
        icon={faStar}
        style={{ color: "#ccc", marginLeft: "4px" }}
      />
    );

  const AddLike = async () => {
    try {
      console.log("Adding 1 to likes");
      const response = await axios.post(`/chats/like?id=${id}&uid=${uid}`);
      // dispatch({
      //   type: "LIKE_TWEET",
      //   payload: response.data,
      // });
    } catch (err) {
      console.log(err);
    }
  };
  const SubLike = async () => {
    try {
      console.log("Subtracting 1 from likes");
      const response = await axios.post(`/chats/dislike?id=${id}&uid=${uid}`);
      // dispatch({
      //   type: "DISLIKE_TWEET",
      //   payload: response.data,
      // });
    } catch (err) {
      console.log(err);
    }
  };

  const handlechatLike = async () => {
    console.log("like status", like);
    if (!like) {
      await AddLike();
    } else {
      await SubLike();
    }
    setLike(!like);
    console.log("like status", like);
  };

  return (
    <span>
    <button
      className="like_link"
      onClick={() => {
        handlechatLike();
      }}
    >
      {handleStar()}
    </button> Like
    </span>
  );
};

export default LikeTweetButton;
