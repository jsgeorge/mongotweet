import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import TweetItem from "../tweets/item";
import { TweetContext } from "../../context/tweet-context";

export default function LikeListing({ likes }) {
  const [state, dispatch] = useContext(TweetContext);
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  const [cnt, setcnt] = useState(0);
  //const [filters, setFilters] = useState([]);
  let sortBy = { sortby: "createdAt", order: "desc" };

  useEffect(() => {
    if (likes) console.log("likes", likes);

    // let filters = [];
    // const fetchData = async () => {

    // };
    // fetchData();
  }, []);

  //if (users) console.log(users);

  const getTweet = async (id) => {
    try {
      const response = await axios.get(`/chats/article?id=${id}`);
      // console.log("likes", response.data[0]);
      return response.data[0];
    } catch (err) {
      console.log(err);
      setError("Cannot retrieve the selected tweets. Network error");
    }
  };
  const handleGetTweet = async (id) => {
    await getTweet(id);
  };
  return (
    <div className="content-wrapper">
      <div className="tweets-wrapper">
        {error ? <div className="has-error">{error}</div> : null}
        {likes && likes.length > 0 ? (
          likes.map((tweet) => (
            <TweetItem key={tweet.id} tweet={handleGetTweet(tweet.id)} />
            // <div key={tweet.id}>{tweet.id}</div>
          ))
        ) : (
          <div className="card-text">"Bummer! You are no likes"</div>
        )}
      </div>
    </div>
  );
}
