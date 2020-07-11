import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import classnames from "classnames";
import FileUpload from "../utils/fileupload";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./../user/avatar";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditUser = () => {
  const { user, setuser, isloggedin } = useContext(UserContext);
  // const [state, dispatch] = useContext(UserContext);
  const [images, setImages] = useState({});
  const [formSuccess, setFormSucess] = useState(false);
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [edited, setEdited] = useState({
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    username: user.username,
    images: user.images,
  });

  useEffect(() => {
    // if (isloggedin && user) {
    //   // setEdited({
    //   // });
    // }
    console.log(edited);
  }, []);
  const renderCardImage = (images) => {
    return images[0].url;
  };
  const validData = () => {
    setErrors({});
    let errs = {};

    if (!edited.name) {
      errs.name = "Invalid/Missing first name";
    }
    if (!edited.lastname) {
      errs.lastname = "Inalid/Missing lastname";
    }
    if (!edited.email) {
      errs.email = "Invalid/Missing email";
    }
    if (!edited.email || !edited.name || !edited.lastname) {
      setErrors(errs);
      return false;
    } else {
      return true;
    }
  };
  const handleChange = (e) => {
    setEdited({ ...edited, [e.target.name]: e.target.value });
  };
  const updateUser = async () => {
    if (images) {
      edited.images = images;
    }

    if (validData()) {
      console.log("edited user", edited);
      try {
        const response = await axios.patch(`/users`, edited);
        if (!response.data.editSuccess) {
          console.log("Error in updating user", response.data.message);
          setErrors({
            form: "error in updatedin user" + response.data.message,
          });
        } else {
          setRedirect(true);
        }
      } catch (err) {
        setErrors({
          form: "Error in updating user. Unknown or network error",
        });
      }
    }
  };

  const onSubmit = async () => {
    await updateUser();
  };
  if (redirect) {
    return <Redirect to="/user" />;
  }
  if (!isloggedin || !user) return <Redirect to="/" />;
  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-3 col-md-3  col-sm-2  Lsidebar"></div>
        <div className="col-lg-6 col-md-6 col-sm-6 content">
          <div className="form-wrapper">
            <h3>
              <Link to={`/user`}>
                <FontAwesomeIcon
                  icon={faLongArrowAltLeft}
                  size="lg"
                  style={{ color: "blue" }}
                />
              </Link>
              Edit Your Profile
            </h3>
            {/* <h5>
              {user ? <Avatar images={user.images} size="avt-lg" /> : null}
              {user && !user.username ? user.name + " " + user.lastname : null}
              {user && user.username ? user.username : null}
            </h5> */}

            <div
              className={classnames("form-group", {
                "has-error": errors.name,
              })}
            >
              {errors.name ? (
                <span className="help-block">{errors.name}</span>
              ) : (
                <label>First Name</label>
              )}
              <input
                name="name"
                className="form-control"
                aria-label="Enter your Name"
                data-testid="add-task-content"
                type="text"
                value={edited.name}
                onChange={handleChange}
              />
            </div>

            <div
              className={classnames("form-group", {
                "has-error": errors.lastname,
              })}
            >
              {errors.lastname ? (
                <span className="help-block">{errors.lastname}</span>
              ) : (
                <label>Last Names</label>
              )}
              <input
                name="lastname"
                className="form-control"
                aria-label="Enter your Last Name"
                data-testid="add-task-content"
                type="text"
                value={edited.lastname}
                onChange={handleChange}
              />
            </div>
            {errors.form && (
              <div className="alert alert-danger">{errors.form}</div>
            )}
            {edited ? (
              <span>
                <div
                  className={classnames("form-group", {
                    "has-error": errors.email,
                  })}
                >
                  {errors.email ? (
                    <span className="help-block">{errors.email}</span>
                  ) : (
                    <label>Email</label>
                  )}

                  <br />
                  <input
                    name="email"
                    className="form-control"
                    aria-label="Enter your task"
                    data-testid="add-task-content"
                    type="email"
                    value={edited.email}
                    onChange={handleChange}
                  />
                </div>
                <div
                  className={classnames("form-group", {
                    "has-error": errors.username,
                  })}
                >
                  {errors.username ? (
                    <span className="help-block">{errors.username}</span>
                  ) : (
                    <label>Username</label>
                  )}
                  <input
                    name="username"
                    className="form-control"
                    aria-label="Enter your Username"
                    data-testid="add-task-content"
                    type="text"
                    value={edited.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Change your avatar</label>
                  <FileUpload
                    images={images}
                    setImages={setImages}
                    reset={formSuccess}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  data-testid="add-shout"
                  onClick={() => onSubmit()}
                >
                  Submit
                </button>
              </span>
            ) : (
              <p>No user found</p>
            )}
            <div></div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar"></div>
      </div>
    </div>
  );
};

export default EditUser;
