import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
import axios from "axios";
import Avatar from "../user/avatar";
import AuthorDetail from "../tweets/author";
import TweetListing from "../tweets";
import { UserContext } from "../../context/user-context";

const UserItem = ({ cuser }) => {
  const user = useContext(UserContext);
  const [error, setError] = useState("");
  const [following, setfollowing] = useState(false);
  const [otheruser, setotheruser] = useState({});

  useEffect(() => {
    if (user && user.following && user.following.length > 0)
      user.following.map((l) => {
        if (l.id === cuser.id) {
          setfollowing(true);
        }
      });
  }, [cuser]);

  const renderCardImage = (images) => {
    if (images.length > 0) return images[0].url; //images[0].url;
  };

  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };
  const followUser = async (id) => {
    if (!following) {
      console.log("following user", id);
      try {
        const response = await axios.post(`/users/follow?id=${id}`);
      } catch (err) {
        console.log(err);
      }
      setfollowing(true);
    } else {
      console.log("notfollowing user", id);
      try {
        const response = await axios.post(`/users/unfollow?id=${id}`);
      } catch (err) {
        console.log(err);
      }
      setfollowing(false);
    }
  };
  const handleFollowUser = async (id) => {
    await followUser(id);
  };
  if (!cuser) return <p>No current user</p>;
  const { name, lastname, email, username, images } = cuser;

  return (
    <div className="card_item_wrapper">
      <div className="card-text">
        <div className="user-item-wrapper">
          <Link to={`/user/${cuser._id}/profile`}>
            <AuthorDetail author={cuser._id} type="tweet" />
          </Link>
          {/*   Show Number of Tweets         */}
          <br />
          <div className="user-item-text">
            <TweetListing uid={user._id} type={"number"} />
          </div>
        </div>
        {!following ? (
          <button
            className="btn btn-default btnDefault btn-sm btnFollow"
            onClick={() => handleFollowUser(cuser._id)}
          >
            Follow
          </button>
        ) : (
          <button
            className="btn btn-primary btn-sm btnFollow"
            onClick={() => handleFollowUser(cuser._id)}
          >
            Following
          </button>
        )}
      </div>
    </div>
  );
};

export default UserItem;
