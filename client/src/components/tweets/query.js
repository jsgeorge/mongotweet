import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import TweetItem from "./item";
import { TweetContext } from "../../context/tweet-context";
import Categories from "../categories";
import UserCard from "../user/card";

export default function TweetQuery({ match }) {
  const [state, dispatch] = useContext(TweetContext);
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  //const [filters, setFilters] = useState([]);
  let sortBy = { sortby: "createdAt", order: "desc" };

  useEffect(() => {
    let filters = [];

    try {
      const { qrytype, name, id } = match.params;
      console.log(qrytype);
      console.log(name);
      console.log(id);

      if (qrytype == "category") {
        setHeader(name);
        filters = { filters: [{ category: id }] };
      }
      if (qrytype == "tag") {
        setHeader(name);
        filters = { filters: [{ tag: name }] };
      }
      if (qrytype == "srchstr") {
        setHeader(name);
        filters = { filters: [{ text: id }] };
      }
      //filters = [{ qrytype: id}];

      // if (!tag && !category) console.log("No filters");
    } catch (err) {
      console.log("no filters or error");
    }
    const fetchData = async () => {
      // if (listype == "main") {

      console.log(filters);
      console.log("filters in fetchData", filters);
      try {
        const response = await axios.post("/chats/view", filters);
        dispatch({
          type: "FETCH_TWEETS",
          payload: response.data,
        });
        console.log("response.data", response.data);
      } catch (err) {
        console.log(err);
        setError("Cannot retrieve the selected tweets");
      }
      // } else if (listype == "user") {
      //   filters = [{ author: uid }];
      //   try {
      //     const response = await axios.post("/chats/view", filters);
      //     dispatch({
      //       type: "FETCH_TWEETS",
      //       payload: response.data,
      //     });
      //   } catch (err) {
      //     console.log(err);
      //     setError("Cannot retrieve the selected tweets. Network error");
      //   }
      // }
    };
    fetchData();
    // if (match.params.qrytype == 'tag' && (!state.tweets == 0 || state.tweets.articles && state.tweets.articles.length == 0) ){
    //   console.log('fetching categoryies instead');
    //    filters = {filters: [{ category: match.params.id}]};
    //    fetchData();
    // }
  }, [dispatch]);

  //if (state.tweets) console.log(state.tweets);
  if (error) {
    return <div className="has-error">{error}</div>;
  }
  if (
    !state.tweets ||
    (state.tweets.articles && state.tweets.articles.length == 0)
  ) {
    return (
      <div className="row">
        <div className="col-lg-3 col-md-3  col-sm-2  Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-6 content">
          <Link to="/tweets">
            <FontAwesomeIcon
              icon={faLongArrowAltLeft}
              size="lg"
              style={{ color: "blue" }}
            />
          </Link>
          <div className="tweets-wrapper">
            <p>No current tweets matching the selected criteria</p>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar">
          <Categories />
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-lg-3 col-md-3  col-sm-2  Lsidebar">
        <UserCard />
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6 content">
        <div>
          <Link to="/tweets">
            <FontAwesomeIcon
              icon={faLongArrowAltLeft}
              size="lg"
              style={{ color: "blue" }}
            />
          </Link>
        </div>
        <div className="tweets-wrapper">
          {/* {header ? <h4>{header} </h4> : null} */}
          {state.tweets && state.tweets.articles ? (
            state.tweets.articles.map((tweet) => (
              <TweetItem key={tweet._id} tweet={tweet} />
            ))
          ) : (
            <p>No current tweets</p>
          )}
        </div>
      </div>
      <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar">
        <Categories />
      </div>
    </div>
  );
}

//export default TweetListing;
