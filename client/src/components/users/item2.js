import React, { useEffect, useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import Moment from "moment";
import axios from "axios";
import Avatar from "../user/avatar";
import AuthorDetail from "../tweets/author";
import TweetListing from "../tweets";
import { UserContext } from "../../context/user-context";

const UserItem2 = ({ uid }) => {
  const user = useContext(UserContext);
  const [error, setError] = useState("");
  const [following, setfollowing] = useState(false);
  const [cuser, setcuser] = useState({});
  const [redirect, setredirect] = useState(true);
  useEffect(() => {
    //console.log("uid", uid);
    if (uid) {
      const getUser = async () => {
        try {
          const response = await axios.get(`/users/id?id=${uid}`);
          setcuser(response.data.userdata);
        } catch (err) {
          console.log(err);
          setError("Cannot retrieve the selected tweets. Network error");
        }
      };

      getUser();
    }
    if (user && user.following && user.following.length > 0)
      user.following.map((l) => {
        if (l.id === uid) {
          setfollowing(true);
        }
      });
  }, [uid]);

  const renderCardImage = (images) => {
    if (images.length > 0) return images[0].url; //images[0].url;
  };

  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };
  const followUser = async () => {
    console.log("notfollowing user", uid);
    try {
      const response = await axios.post(`/users/unfollow?id=${uid}`);
      setredirect(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollowUser = async () => {
    await followUser();
  };
  if (!cuser) return <div>NO currenet user</div>;

  const { name, lastname, email, username, images } = cuser;
  //if (redirect) return <Redirect to="/user" />;
  return (
    <div className="card_item_wrapper">
      <div className="card-text">
        <div className="user-item-wrapper">
          <Link to={`/user/${uid}/profile`}>
            <AuthorDetail author={uid} type="tweet" />
          </Link>
        </div>
      </div>
      {/* {!following ? (
        <button
          className="btn btn-default btnDefault btn-sm btnFollow"
          onClick={() => handleFollowUser(cuser._id)}
        >
          Follow
        </button>
      ) : ( */}
      <button
        className="btn btn-primary btn-sm btnFollow"
        onClick={() => handleFollowUser()}
      >
        Following
      </button>
      {/* )} */}
    </div>
  );
};

export default UserItem2;
