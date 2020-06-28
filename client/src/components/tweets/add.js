import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import FileUpload from "../utils/fileupload";
import classnames from "classnames";
import axios from "axios";
import { TweetContext } from "../../context/tweet-context";
//import { flashErrorMessage } from "../layout/flash-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHashtag } from "@fortawesome/react-fontawesome";

const AddTweet = ({ type, uid, username }) => {
  const [mode] = useState(type);
  const [id] = useState(uid);
  const [uname] = useState(username);
  const [dispatch] = useContext(TweetContext);
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("");
  const [tweet, setTweet] = useState("");
  const [formSuccess, setFormSucess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [images, setImages] = useState({});
  const [redirect, setRedirect] = useState(false);
  //const [uploadedImages, setUploadedImages] = userState([]);
  useEffect(() => {});

  const validData = () => {
    let errs = {};
    setErrors({});
    if (!tweet) {
      errs.tweet = "Inalid/Missing tweet";
    }
    if (!category) {
      errs.category = "inalid/missing category";
    }
    //console.log(errs);
    if (!tweet || !category) {
      setErrors(errs);
      return false;
    }
    //console.log(errors);
    //if (errors) return false;

    return true;
  };
  const fetchTweets = async () => {
    console.log("uid", uid);

    const response = await axios.post("/chats/view");
    dispatch({
      type: "FETCH_TWEETS",
      payload: response.data,
    });
  };
  const addTweet = async () => {
    if (validData()) {
      let newTweet = {
        author: id,
        text: tweet,
        category: category,
        images: images,
      };
      console.log(newTweet);
      //***Removed const response = await axios.post("/chats/article", newTweet);
      // dispatch({
      //   type: "CREATE_TWEET",
      //   payload: response.data,
      //*** */ });
      // if (response.data.addSuccess) {
      //   setTweet("");
      //   setCategory("");
      //   setFormError(false);
      //   if (mode === "mobile") setRedirect(true);
      //   setFormError(true);
      // } else {
      // }
      const response = await axios
        .post("/chats/article", newTweet)
        .then((res) => {
          setTweet("");
          setCategory("");
          setFormError(false);

          if (mode === "mobile") setRedirect(true);
        })
        .catch((err) => {
          setFormError(true);
          console.log(err);
        });
    } else {
      console.log("invalid data");
    }
  };
  const renderCardImage = (images) => {
    return images[0].url;
  };
  const onSubmit = async () => {
    await addTweet();
  };

  if (redirect) {
    return <Redirect to="/tweets" />;
  }
  const placeholder = `What is on you mind ${uname}`;
  return (
    <div className="add-tweet">
      <div className="form-group">
        <textarea
          className="form-control"
          style={{ fontSize: "20px" }}
          value={tweet}
          placeholder={placeholder}
          onChange={(e) => setTweet(e.target.value)}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          placeholder="category tags"
          value={category}
          style={{ fontSize: "20px" }}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      {/* <FileUpload
          imagesHandler={(images) => imagesHandler(images)}
          reset={formSuccess}
        /> */}
      <FileUpload images={images} setImages={setImages} reset={formSuccess} />

      <div className="form-cmds">
        <button
          type="button"
          className="btn btn-primary btn-sm btnMed"
          onClick={() => onSubmit()}
        >
          Tweet
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
  );
};

export default AddTweet;