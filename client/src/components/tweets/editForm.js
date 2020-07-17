import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import FileUpload from "../utils/fileupload";
import classnames from "classnames";
import { Link } from "react-router-dom";
import axios from "axios";
import { TweetContext } from "../../context/tweet-context";
import { UserContext } from "../../context/user-context";
import Avatar from "./../user/avatar";
import AuthorDetail from "./author";
import Moment from "moment";

const EditTweetForm = ({ item }) => {
  const user = useContext(UserContext);
  const [dispatch] = useContext(TweetContext);
  const [errors, setErrors] = useState({});
  const [tweet, setTweet] = useState("");
  const [category, setCategory] = useState("");
  const [edited, setEdited] = useState({
    text: item.text,
    tag: item.tag,
    images: item.images,
  });
  const [formSuccess, setFormSucess] = useState(false);
  const [formError, setFormError] = useState("");
  const [images, setImages] = useState({});
  const [redirect, setRedirect] = useState(false);
  //const [uploadedImages, setUploadedImages] = userState([]);
  useEffect(() => {
    //setEdited({ text: item.text, tag: item.tag });
    // setTweet(item.text);
    // setCategory(item.tag);
  });
const displayDate = (d) => {
    return Moment(d).format("MMM D h:mm A");
  };
  const validData = () => {
    let errs = {};
    setErrors({});
    if (!edited.text) {
      errs.text = "Inalid/Missing tweet";
    }
    if (!edited.tag) {
      errs.tag = "inalid/missing category";
    }
    //console.log(errs);
    if (!edited.text || !edited.tag) {
      setErrors(errs);
      return false;
    }
    //console.log(errors);
    //if (errors) return false;

    return true;
  };

  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };
  const addTweet = async () => {
    if (validData()) {
      let updTweet = {
        ...item,
        text: edited.text,
        tag: edited.tag,
      };
      console.log(updTweet);
      try {
        const response = await axios
          .post(`/chats/update?id=${item._id}`, updTweet)
          .then((res) => {
            setRedirect(true);
          })
          .catch((err) => {
            setFormError(err);
          });
      } catch (error) {
        setFormError(error);
      }
    }
  };

  const onSubmit = async () => {
    await addTweet();
  };
  const renderCardImage = (images) => {
    return images[0].url;
  };
  if (redirect) {
    return <Redirect to={`/tweets/${item._id}/view`} />;
  }
  if (!user) return <Redirect to="/" />;

  return (
    <div className="add-tweet">
      {user && edited ? (
        <div className="tweet-form" >
          <div className="author-line">
              <AuthorDetail author={item.author} />
              <span className="chat-date">{displayDate(item.createdAt)}</span>
          </div>
          <div className="form-group">
         
              <textarea
                name="text"
                className="form-control"
                style={{ fontSize: "20px", borderBottom:"1px solid #ccc" }}
                value={edited.text}
                onChange={handleChange}
                rows="3"
              />
          </div>
          <div className="form-group">
                Tag
                <input
                  name="tag"
                  className="form-control"
                  type="text"
                  placeholder="category tags"
                  value={edited.tag}
                  onChange={handleChange}
                  style={{borderBottom:"1px solid #ccc"}}
                />
              </div>
              {edited.images && edited.images.length > 0 ? (
                <div
                  className="image"
                  style={{
                    background: `url(${renderCardImage(
                      edited.images
                    )}) no-repeat`,
                  }}
                />
              ) : null}  
              <div className="form-group" style={{marginTop:"15px"}}> 
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onSubmit()}
                style={{float:"right"}}
              >
                reTweet
              </button>
              </div>
            {errors.tweet ? (
              <div className="has-error">Error {errors.tweet}</div>
            ) : null}
            {errors.category ? (
              <div className="has-error">Error {errors.category}</div>
            ) : null}
            {formError ? (
              <div className="has-error">Error - Could not add tweet</div>
            ) : null}
        </div>
      ) : (
        <p>NO tweet found</p>
      )}
    </div>
  );
};

export default EditTweetForm;
