import React, { useContext, useEffect, useState } from "react";
import Moment from "moment";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TweetContext } from "../../context/tweet-context";
import { UserContext } from "../../context/user-context";
import TweetDetail from "../tweets/detail";
import UserCard from "../user/card";
import Categories from "../categories";
import Avatar from "../user/avatar";

export default function TweetDetailPage({ match }) {
  const [state, dispatch] = useContext(TweetContext);
  // const [isAuthenticted, setIsAuthenticated] = useState(false);
  const [setError] = useState("");
  const [like, setLike] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
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

  if (!state.tweet)
    return (
      <div className="card_item_wrapper">
        <p>Cannot display the current tweet</p>
      </div>
    );

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8   col-xs-9 content">
          <TweetDetail tweet={state.tweet} />
        </div>

        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 Rsidebar">
          <Categories />
        </div>
      </div>
    </div>
  );
}
