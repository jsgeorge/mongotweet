import React, { useContext, useEffect, useState } from "react";
import AddTweet from "../tweets/add";
import { UserContext } from "../../context/user-context";
import { Redirect } from "react-router-dom";

const AddTweetPage = () => {
  //const [state, dispatch] = useContext(UserContext);
  const { user, setuser } = useContext(UserContext);
  //if (state.user) console.log(state.user[0]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {}, []);

  if (!user) return <Redirect to="/" />;

  return (
    <div className="page-wrapper">
      {user ? <AddTweet type="mobile" user={user} /> : null}
    </div>
  );
};

export default AddTweetPage;
