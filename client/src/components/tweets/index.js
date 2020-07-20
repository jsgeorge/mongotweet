import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import TweetItem from "./item";
import { TweetContext } from "../../context/tweet-context";
import  LoadingSpinner  from "../utils/LoadingSpinner";

export default function TweetListing({ uid, type }) {
  //const [state, dispatch] = useContext(TweetContext);
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  const [cnt, setcnt] = useState(0);
  const [ isLoading, setisLoading ] = useState(true);

  let sortBy = { sortby: "createdAt", order: "desc" };

  const fetchTweets = async () => {
     let filters = [];
     setisLoading(true);
    
      if (uid) filters = { filters: [{ author: uid }] };

      try {
        const response = await axios.post("/chats/view", filters);
        // dispatch({
        //   type: "FETCH_TWEETS",
        //   payload: response.data,
        // });
        setTweets(response.data.articles);
        setcnt(response.data.size);
        setisLoading(false);
      } catch (err) {
        console.log(err);
        setError("Cannot retrieve the selected tweets. Network error");
       setisLoading(false);
      }
    };

  useEffect(() => {
    fetchTweets();
  }, [uid]); //, dispatch]);

 
  return (
    <span>
      {type && type === "number" ? (
        <span>
          {" "}
          {/* {state.tweets && state.tweets.articles ? ( */}
           {tweets ? (
            <span className="tweet-cnt">{cnt} tweets</span>
          ) : (
            "No tweets"
          )}
        </span>
      ) : (
        <div className="content-wrapper border-top">
          <div className="tweets-wrapper">
            {error ? <div className="has-error">{error}<br/>
            <button onClick={()=>fetchTweets()} className="btn btn-primary btn-sm btnFloatR">Try Again</button></div> : null}
            {isLoading && (
             <div className="center">
               <LoadingSpinner asOverlay />
               </div>
           )}
            {/* {state.tweets &&
            state.tweets.articles &&
            state.tweets.articles.length > 0 ? (
              <span>
               
              {state.tweets.articles.map((tweet) => ( */}
            {tweets && tweets.length > 0 ? (
              <span>
              {tweets.map((tweet) => (
                <TweetItem key={tweet._id} tweet={tweet} />
              ))}
              <div className="primary-clr" style={{margin:"30px 0",
               textAlign:"center"}}><br/>------<br/>
               That's all you are caught up<br/>----<br/>---<br/>-</div>
              </span>
            ) : (
              <div className="card-text">
               {!error && <span>
                {!uid 
                  ? "Bummer! There are no current tweets. Check back later or make some of your own"
                  : "Snap! You have no current tweets. Add your tweet soon"}
               </span>}
              </div>
            )}
          </div>
        </div>
      )}
    </span>
  );
}

//export default TweetListing;
