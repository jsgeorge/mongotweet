import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TweetContext } from "../../context/tweet-context";
import EditTweetForm from "./editForm.js";

const TweetEdit = ({ match }) => {
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

  return (
    <div>
      {!state.tweet ? (
        <div className="card_item_wrapper">
          <p>Cannot display the current tweet</p>
        </div>
      ) : (
        <EditTweetForm item={state.tweet} />
      )}
    </div>
  );
};

export default TweetEdit;
