import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "moment";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faStar } from "@fortawesome/free-solid-svg-icons";
//import { faHeart } from "@fortawesome/free-solid-svg-icons";
//import { TweetContext } from "../../context/tweet-context";
//import axios from "axios";
import AuthorDetail from "./author";

const TweetItem = ({ tweet }) => {
  //const [dispatch] = useContext(TweetContext);
  //const [user, setuser] = useState("");
  //const [like, setLike] = useState(false);
  //const [favorite, setFavorite] = useState(false);
  //const [error, setError] = useState("");
  useEffect(() => {
    // console.log("item tweet = ", tweet);
    //console.log("*****item tweet.author passed to fetch_author", tweet.author);
    //   const getUser = async () => {
    //     if (tweet.author) {
    //       try {
    //         //console.log("fetching author data in item");
    //         //console.log(`/users/id?id=${tweet.author}`);
    //         const response = await axios.get(`/users/id?id=${tweet.author}`);
    //         dispatch({
    //           type: "FETCH_AUTHOR",
    //           payload: response.data,
    //         });
    //         // console.log("respose.data", response.data.userdata);
    //         setuser(response.data);
    //         console.log(user);
    //         //if(response.data.userdata.username)
    //         //  return response.data.userdata.username;
    //         //else
    //         // return response.data.userda+ta.firstname + ' ' + response.data.userdata.lastname
    //       } catch (error) {
    //         console.log(error);
    //         setError("unknown user");
    //       }
    //     } else {
    //       console.log("Error. Cannot retrieve author userdata. Invalid author");
    //       setError("Invalid author error");
    //     }
    //   };
    //   getUser();
    // }, [dispatch]);
  });
  const renderCardImage = (images) => {
    if (images.length > 0) return images[0].url; //images[0].url;
  };

  const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };
  // const chatLike = (id) => {
  //   setLike(!like);
  // };

  // const changeFavorite = (id) => {
  //   setFavorite(!favorite);
  // };
  // const handleStar = () =>
  //   favorite ? (
  //     <FontAwesomeIcon
  //       icon={faStar}
  //       style={{ color: "rgb(25, 123, 189)", marginLeft: "4px" }}
  //     />
  //   ) : (
  //     <FontAwesomeIcon icon={faStar} style={{ marginLeft: "4px" }} />
  //   );

  // const addFavorite = (id) => {};

  // const deleteFavorite = (id) => {};
  //const a = user.userdata;
  const { _id, author, text, tag, images, createdAt, comments, likes } = tweet;

  return (
    <div className="card_item_wrapper">
      <div className="card-text">
        <Link to={`/tweets/query/${tag}`} className="tag-link">
          <strong>{tag ? tag : null}</strong>
        </Link>
        <AuthorDetail author={author} />{" "}
        <span className="chat-date">{displayDate(createdAt)}</span>
        <br />
        {text ? (
          <Link to={`/tweets/${_id}/view`} className="chat-text">
            {text}{" "}
          </Link>
        ) : null}
      </div>
      {images && images.length > 0 && images[0].url ? (
        <Link to={`/tweets/${_id}/view`}>
          <div
            className="image"
            style={{
              background: `url(${renderCardImage(images)}) no-repeat`,
            }}
          />
        </Link>
      ) : null}
      <div className="actions">
        comments {comments.length} likes: {likes}
        {/* <div className="button_wrapp">
          <Link className="card_link" to={`/chat/${_id}`}>
            More
          </Link>
          </div>*/}
        {/*<div className="button_wrapp">
          <button
            className="like_link"
            onClick={() => {
              //   props.user.userData.isAuth
              //     ? this.props.dispatch(chatLike(props._id))
              //     : this.props.history.push("/login");
              chatLike(_id);
            }}
          >
            <FontAwesomeIcon icon={faStar} /> Like
          </button>
        </div>
        <div className="button_wrapp">
          {favorite ? (
            <button
              className="add_favorites"
              onClick={() => {
                deleteFavorite(_id);
                setFavorite(false);
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
              Delete Favorite
            </button>
          ) : (
            <button
              className="add_favorites"
              onClick={() => {
                addFavorite(_id);
                setFavorite(false);
              }}
            >
              <FontAwesomeIcon icon={faHeart} />
              Add Favorite
            </button>
          )}
            </div>*/}
      </div>
    </div>
  );
};

export default TweetItem;
