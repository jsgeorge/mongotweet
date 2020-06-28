import React, { useContext, useEffect, useState } from "react";
import AddTweet from "../tweets/add";
import { UserContext } from "../../context/user-context";

const AddTweetPage = () => {
  const [state, dispatch] = useContext(UserContext);
  //if (state.user) console.log(state.user[0]);
  return (
    <div className="tweet-wrapper">
      {state.user && state.user[0] ? (
        <AddTweet
          type="mobile"
          uid={state.user[0].user._id}
          username={state.user[0].user.username}
        />
      ) : null}
    </div>
  );
};

export default AddTweetPage;
