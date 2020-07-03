import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import classnames from "classnames";
import FileUpload from "../utils/fileupload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const EditUser = () => {
  //const [user, setUser] = useState({});
  const {user, setuser} = useContext(UserContext)
  const [uid, setUid] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);
 // const [state, dispatch] = useContext(UserContext);
  //const RegisterUser = () => {};
  const [images, setImages] = useState({});
  const [formSuccess, setFormSucess] = useState(false);
  const [edited, setEdited] = useState({});

  useEffect(() => {
     console.log('EditUserPage user:', user);
    if (user && user) {
      setEdited({
        username: user.username,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        username: user.username,
        images: user.images,
      });
    }
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
        const response = await axios.patch(`/users?uid=${uid}`, edited);
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
          form: "Error in createing user.Unknown or network error",
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

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-3 col-md-3  col-sm-2  Lsidebar"></div>
        <div className="col-lg-6 col-md-6 col-sm-6 content">
          <div className="form-wrapper">
            <h3>Edit Your Profile</h3>
            <h5>
              {user && user.images ? (
                <div
                  className="avatar"
                  style={{
                    background: `url(${renderCardImage(images)}) no-repeat`,
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  size="lg"
                  style={{
                    border: "2px solid blue",
                    borderRadius: "100px",
                    color: "blue",
                  }}
                />
              )}
              {user && !user.username
                ? user.name + " " + user.lastname
                : null}
              {user && user.username
                ? user.username
                : null}
            </h5>

            {errors.form && (
              <div className="alert alert-danger">{errors.form}</div>
            )}
            <div className="form-group">
              <label>Change your avatar</label>
              <FileUpload
                images={images}
                setImages={setImages}
                reset={formSuccess}
              />
            </div>
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
                className="form-control"
                aria-label="Enter your Username"
                data-testid="add-task-content"
                type="text"
                value={edited.username}
                onChange={handleChange}
              />
            </div>

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
                className="form-control"
                aria-label="Enter your Last Name"
                data-testid="add-task-content"
                type="text"
                value={edited.lastname}
                onChange={handleChange}
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
            <div>
              <Link to="/user" className="btn btn-default btn-sm">
                Cancel
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar"></div>
      </div>
    </div>
  );
};

export default EditUser;
