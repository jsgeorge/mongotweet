import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import TweetItem from "./item";
import { TweetContext } from "../../context/tweet-context";

export default function TweetListing({ uid }) {
  const [state, dispatch] = useContext(TweetContext);
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  //const [filters, setFilters] = useState([]);
  let sortBy = { sortby: "createdAt", order: "desc" };

  useEffect(() => {
    let filters = [];

    const fetchData = async () => {
      if (uid) filters = { filters: [{ author: uid }] };

      try {
        const response = await axios.post("/chats/view", filters);
        dispatch({
          type: "FETCH_TWEETS",
          payload: response.data,
        });
      } catch (err) {
      //   console.log(err);
      //   setError("Cannot retrieve the selected tweets. Network error");
       }
    };
    fetchData();
  }, [dispatch]);

  //if (state.tweets) console.log(state.tweets);

  return (
    <div className="content-wrapper border-top">
      <div className="tweets-wrapper">
        {error ? <div className="has-error">{error}</div> : null}
        {state.tweets &&
        state.tweets.articles &&
        state.tweets.articles.length > 0 ? (
          state.tweets.articles.map((tweet) => (
            <TweetItem key={tweet._id} tweet={tweet} />
          ))
        ) : (
          <div className="card-text">
            {!uid
              ? "Bummer! There are no current tweets. Check back later or make some of your own"
              : "Snap! You have no current tweets. Add your tweet soon"}
          </div>
        )}
      </div>
    </div>
  );
}

//export default TweetListing;
