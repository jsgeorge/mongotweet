import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { UserContext } from "../../context/user-context";
import { TweetContext } from "../../context/tweet-context";
import EditTweetForm from "../tweets/editForm.js";
import UserCard from "../user/card";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditTweetPage = ({ match }) => {
  const { user, setuser, isloggedin } = useContext(UserContext);
  const [state, dispatch] = useContext(TweetContext);
  const [category, setCategory] = useState("");
  const [tweet, setTweet] = useState("");
  const [images, setImages] = useState({});
  const [formSuccess, setFormSucess] = useState(false);
  const [formError, setFormError] = useState(false);

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");

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
  }, [match.params, dispatch]);
  if (!isloggedin) return <Redirect to="/" />;

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8   col-xs-9 content">
               <div className="card-text">
 <Link to={`/tweets/${match.params.id}/view`}>
            <FontAwesomeIcon
              icon={faLongArrowAltLeft}
              size="lg"
              style={{ color: "blue" }}
            />
          </Link>
          Edit Tweet
          {!state.tweet ? (
            <div className="card_item_wrapper">
              <p>Cannot display the current tweet</p>
            </div>
          ) : (
            <EditTweetForm item={state.tweet} />
          )}
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-2 col-xs-4 Rsidebar"></div>
      </div>
    </div>
  );
};

export default EditTweetPage;
