import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
//import FileUpload from "../utils/fileupload";
import classnames from "classnames";
import axios from "axios";
import { TweetContext } from "../../context/tweet-context";
//import { flashErrorMessage } from "../layout/flash-message";
import Avatar from "../user/avatar";

const NewCommentForm = ({ id, user }) => {
  const [tweetid] = useState(id);
  const [userid] = useState(user._id);
  const [author] = useState(user.username);
  const [dispatch] = useContext(TweetContext);
  const [avatar] = useState(user.avatar);
  const [errors, setErrors] = useState({});
  const [comment, setComment] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {});

  const validData = () => {
    let errs = {};
    setErrors({});

    if (!comment) {
      errs.comment = "Inalid/Missing comment";
    }
    if (!comment) {
      setErrors(errs);
      return false;
    } else {
      return true;
    }
  };

  const addComment = async () => {
    console.log(validData());
    if (validData()) {
      let newComment = {
        user: author,
        text: comment,
      };
      //console.log(newComment);
      try {
        // const response = await axios.post(`/chats/comment?id=${id}`, newComment);
        // dispatch({
        //   type: "ADD_COMMENT",
        //   payload: response.data,
        // })
        const response = await axios
          .post(`/chats/comment?id=${id}`, newComment)
          .then((res) => {
            setComment("");
            setFormError(false);
            setFormSuccess(true);
            console.log("comment added");
            setRedirect(true);
          })
          .catch((err) => {
            setFormError(true);
            setFormSuccess(false);
            console.log(err);
          });
        //console.log(response.data);

        //
      } catch (error) {
        // console.log(error);
        // setFormError(true)
        //flashErrorMessage(dispatch, error);
      }
    } else {
      console.log("invalid data");
      setFormError(true);
    }
  };

  const onSubmit = async () => {
    await addComment();
  };

  if (redirect) {
    return <Redirect to="/tweets" />;
  }
  //const placeholder = `What is on you mind ${uname}`;
  return (
    <div className="add-comment">
      {/* <form> */}
      {/* {state.message.content && <FlashMessage message={state.message} />} */}
      {/* {errors.form && <div className="alert alert-danger">{errors.form}</div>} */}
      {/* <div className={classnames("form-group", { "has-error": errors })}>
          {errors.tweet && <span className="help-block">{errors.email}</span>}
        </div>
 */}{" "}
      <div className="row">
        <div className="col-md-1" style={{ background: "#ccc" }}>
          <div className="avatar-wrapper">
            <Avatar images={user.images} size="avt-sm" />
          </div>
        </div>
        <div className="col-md-11">
          <div className={classnames("form-group", { "has-error": errors })}>
            {errors.comment && (
              <span className="help-block">{errors.comment}</span>
            )}

            <input
              className="form-control"
              value={comment}
              placeholder="Add you comment"
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSubmit()}
          >
            GO
          </button>

          {/* {formSuccess ? (
       <div>Comment added successfully</div>
      ) : null} */}
          {formError ? (
            <div className="has-error">Error - Could not add comment</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewCommentForm;
