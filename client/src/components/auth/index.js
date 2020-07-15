import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const Auth = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.jwtToken) {
          return <Component {...props} />;
        }
        return <Redirect to="/auth/signin" />;
      }}
    />
  );
};
export default Auth;
