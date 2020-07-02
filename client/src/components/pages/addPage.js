import React, { useContext, useEffect, useState } from "react";
import AddTweet from "../tweets/add";
import { UserContext } from "../../context/user-context";
import { Redirect} from "react-router-dom";

const AddTweetPage = () => {
  const [state, dispatch] = useContext(UserContext);
  //if (state.user) console.log(state.user[0]);
  const[ redirect, setRedirect] = useState(false);

 useEffect(() => {
  
  }, []);

  if  (!state.user[0] ) return (<Redirect to="/" />);

  return (
    <div className="page-wrapper">
    
      {state.user && state.user[0] ? (
        <AddTweet
          type="mobile"
          user={state.user[0].user}
        />
      ) :null}
    </div>
  );
};

export default AddTweetPage;
