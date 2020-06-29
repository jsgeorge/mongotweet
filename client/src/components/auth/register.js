import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import classnames from "classnames";
import FileUpload from "../utils/fileupload";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const [dispatch] = useContext(UserContext);
  //const RegisterUser = () => {};
  const [images, setImages] = useState([]);
  const [formSuccess, setFormSucess] = useState(false);

  useEffect(() => {});
  const validData = () => {
    setErrors({});
    let errs = {};

    if (!username) {
      errs.username = "Inalid/Missing username";
    }
    if (!password) {
      errs.password = "Invalid/Missing password";
    }

    if (!name) {
      errs.name = "Invalid/Missing first name";
    }
    if (!lastname) {
      errs.lastname = "Inalid/Missing lastname";
    }
    if (!email) {
      errs.email = "Invalid/Missing email";
    }
    if (!username || !password || !email || !name || !lastname) {
      setErrors(errs);
      return false;
    } else {
      return true;
    }
  };

  const createUser = async () => {
    if (validData()) {
      let newUser = {
        email: email,
        password: password,
        username: username,
        name: name,
        lastname: lastname,
        images: images,
      };
      console.log("newUser", newUser);
      try {
        const response = await axios.post("/users", newUser);
        if (!response.data.regSuccess) {
          console.log(response.data.message);
          setErrors({ form: response.data.message });
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
    await createUser();
  };
  if (redirect) {
    return <Redirect to="/auth/signin" />;
  }

  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-3 col-md-3  col-sm-2  Lsidebar"></div>
        <div className="col-lg-6 col-md-6 col-sm-6 content noborder">
          <div className="form">
            <div className="form-header">
              <h3>Sign Up</h3>
            </div>
            <div
              className={classnames("form-group", {
                "has-error": errors.name,
              })}
            >
              {errors.name ? (
                <span className="help-block">{errors.name}</span>
              ) : (
                <span className="error-space" />
              )}
              <input
                className="form-control"
                aria-label="Enter your Name"
                data-testid="add-task-content"
                type="text"
                value={name}
                placeholder="First Name"
                onChange={(e) => setName(e.target.value)}
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
                <span className="error-space" />
              )}
              <input
                className="form-control"
                aria-label="Enter your Last Name"
                data-testid="add-task-content"
                type="text"
                value={lastname}
                placeholder="Lastname"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            {errors.form && (
              <div className="alert alert-danger">{errors.form}</div>
            )}
            <div
              className={classnames("form-group", {
                "has-error": errors.email,
              })}
            >
              {errors.email ? (
                <span className="help-block">{errors.email}</span>
              ) : (
                <span className="error-space" />
              )}
              <input
                className="form-control"
                aria-label="Enter your task"
                data-testid="add-task-content"
                type="email"
                value={email}
                placeholder="Login Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div
              className={classnames("form-group", {
                "has-error": errors.password,
              })}
            >
              {errors.password ? (
                <span className="help-block">{errors.password}</span>
              ) : (
                <span className="error-space" />
              )}
              <input
                className="form-control"
                aria-label="Enter your task"
                data-testid="add-task-content"
                type="password"
                value={password}
                placeholder="Login password"
                onChange={(e) => setPassword(e.target.value)}
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
                <span className="error-space" />
              )}
              <input
                className="form-control"
                aria-label="Enter your Username"
                data-testid="add-task-content"
                type="text"
                value={username}
                placeholder="Username (optional)"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group" id="upl-avatar">
              <label>Upload your avatar</label>
              <FileUpload
                images={images}
                setImages={setImages}
                reset={formSuccess}
              />
            </div>

            <div className="form-cmds">
              <Link
                to="/auth/signin"
                className="btn btn-default .btn-default btnDefault btn-login "
              >
                Signin
              </Link>
              <button
                type="button"
                className="btn btn-primary btn-login"
                data-testid="add-shout"
                onClick={() => onSubmit()}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar noborder"></div>
      </div>
    </div>
  );
};

export default SignupPage;
