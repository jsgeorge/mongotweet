import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import classnames from "classnames";
import { flashErrorMessage } from "../layout/flash-message";
import setAuthorizationToken from "../../utils/setAuthToken";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  //const [state, dispatch] = useContext(UserContext);
  const { user, setuser, isloggedin, setisloggedin } = useContext(UserContext);
  const [errors, setErrors] = useState({});

  useEffect(() => {});

  const validData = () => {
    setErrors({});
    let errs = {};

    if (!email) {
      errs.email = "Inalid/Missing email";
    }
    if (!password) {
      errs.password = "Invalid/Missing password";
    }

    if (!email || !password) {
      setErrors(errs);
      return false;
    } else {
      return true;
    }
  };

  const signinUser = async () => {
    setErrors({});
    if (validData()) {
      let userData = {
        email: email,
        password: password,
      };
      try {
        const response = await axios.post("/auth", userData);
        // dispatch({
        //   type: "LOGIN_USER",
        //   payload: response.data,
        // });
        if (!response.data.loginSuccess) {
          console.log(response.data.message);
          setErrors({ form: response.data.message });
        } else {
          setuser(response.data.user);
          setisloggedin(true);
          localStorage.setItem("jwtToken", response.data.token);
          setAuthorizationToken(localStorage.jwtToken);
          setRedirect(true);
        }
      } catch (error) {
        console.log("Invalid email and/or passowrd", error);
        setErrors({ form: "invalid email and/or password" });
        //flashErrorMessage(dispatch, error);
      }
    } else {
      console.log("false");
    }
  };

  const onSubmit = async () => {
    await signinUser();
  };
  if (redirect) {
    return <Redirect to="/tweets" />;
  }
  //if (state.user && state.user[0]) return <Redirect to="/tweets" />;
  if (isloggedin) return <Redirect to="/tweets" />;
  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-3  col-sm-2  Lsidebar "></div>
        <div className="col-lg-6 col-md-6 col-sm-6 content noborder">
          <div className="form">
            <div className="form-header">
              <h3>Sign In</h3>
            </div>
            <div className="form-wrapper">
              {/* {state && state.message.content && (
              <FlashMessage message={state.message} />
            )} */}
              {errors.form && (
                <div className="alert alert-danger">{errors.form}</div>
              )}
              <div
                className={classnames("form-group", { "has-error": errors })}
              >
                {errors.email && (
                  <span className="help-block">{errors.email}</span>
                )}

                <input
                  className="form-control"
                  aria-label="Enter your task"
                  data-testid="add-task-content"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div
                className={classnames("form-group", { "has-error": errors })}
              >
                {errors.password && (
                  <span className="help-block">{errors.password}</span>
                )}

                <input
                  className="form-control"
                  aria-label="Enter your task"
                  data-testid="add-task-content"
                  type="password"
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-cmds">
                <Link
                  to="/auth/signup"
                  className="btn btn-default btn-sm btnDefault btn-login "
                >
                  Signup
                </Link>
                <button
                  type="button"
                  className="btn btn-primary btn-sm btn-login"
                  data-testid="add-shout"
                  onClick={() => onSubmit()}
                >
                  Signin
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3 Rsidebar noborder"></div>
      </div>
    </div>
  );
};

export default SigninPage;
