import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import FileUpload from "../utils/fileupload";
import classnames from "classnames";
import axios from "axios";
import { TweetContext } from "../../context/tweet-context";
import { UserContext } from '../../context/user-context';
//import { flashErrorMessage } from "../layout/flash-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faHashtag } from "@fortawesome/react-fontawesome";
import Avatar from '../user/avatar';

const AddTweet = ({ type, user}) => {
  const [mode] = useState(type);
 // const {user, setuser } = useContext(UserContext)
  // const [id] = useState(uid);
 // const [username, setUsername] = useState("");
 //  const [dispatch] = useContext(TweetContext);
//  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [category, setCategory] = useState("");
  const [tweet, setTweet] = useState("");
  const [formSuccess, setFormSucess] = useState(false);
  const [formError, setFormError] = useState("");
 const [images, setImages] = useState({});
   const [redirect, setRedirect] = useState(false);
     const [redirectDesk, setRedirectDesk] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  
  useEffect(() => {
   
      //  try {
      //  setAvatar(user.images)
      //  }catch(err){
      //     console.log(err);
      //  }
       //try{
      // if (user.username) setUsername(user.username);
      // else setUsername(user.name + ' ' + user.lastname)
      //  }
      //  catch(err){
      //    console.log(err);
      //  }
   
  },[]);

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

  // const fetchTweets = async () => {
  //   const response = await axios.post("/chats/view");
  //   dispatch({
  //     type: "FETCH_TWEETS",
  //     payload: response.data,
  //   });
  // };

  const addTweet = async () => {
    if (validData()) {
      let newTweet = {
        author: user._id,
        avatar: user.images,
        text: tweet,
        category: category,
        images: images,
      };
    
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
          else  setRedirectDesk(true);
          
        })
        .catch((err) => {
          setFormError(true);
          console.log(err);
        });
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
  if (redirectDesk) {
  return <Redirect to="/" />;
  }
  const placeholder = `What is on you mind`;
  

  return (
    <span>
     {/* <div className="add-tweet"> */}
    <Avatar images={user.images} />
    <div
      className={classnames("add-tweet", {
        "add-tweet-full": images && images.length > 0,
      })}
    >
    
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
      
       {errors.tweet ? (
        <div className="has-error">Error {errors.tweet}</div>
      ) : null}
      {errors.category ? (
        <div className="has-error">Error {errors.category}</div>
      ) : null}

      {formError ? (
        <div className="has-error">Error - Could not add tweet {formError}</div>
      ) : null}
      <div className="file_upload_wrapper">
        <FileUpload images={images} setImages={setImages} reset={formSuccess} />
      </div>
      
      <div className="tweet-btn-wrapper">
        <button
          type="button"
          className="btn btn-info btn-sm primary btnMed"
          onClick={() => onSubmit()}
        >
          Tweet
        </button>
      </div>
    
    </div>
    </span>
  );
};

export default AddTweet;
