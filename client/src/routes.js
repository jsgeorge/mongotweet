import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/auth";

//Pages
import HomePage from "./components/pages/home";
import SigninPage from "./components/auth/login";
import SignupPage from "./components/auth/register";
import UserPage from "./components/user";
import ProfilePage from "./components/user/profile";

import EditUser from "./components/user/edit";
import TweetsPage from "./components/tweets";
import TweetQuery from "./components/tweets/query";
import AddTweetPage from "./components/pages/addPage";
import TweetDetail from "./components/tweets/detail";
import SearchPage from "./components/pages/searchPage";
import TweetEdit from "./components/tweets/edit";
import ModelPage from "./components/pages/model";
const Routes = () => {
  return (
    // <Layout>
    <Switch>
      <Route
        path="/tweets/tweets/query/:qrytype/:name/:id"
        exact
        component={TweetQuery}
      />
      <Route
        path="/tweets/query/:qrytype/:name/:id"
        exact
        component={TweetQuery}
      />
      <Route path="/tweets/:id/view" exact component={TweetDetail} />
      <Route path="/tweets/:id/edit" exact component={TweetEdit} />
      <Route path="/tweets/search" exact component={SearchPage} />
      <Route path="/tweets/add" exact component={AddTweetPage} />
      <Route path="/auth/signin" exact component={SigninPage} />
      <Route path="/auth/signup" exact component={SignupPage} />
      <Auth path="/user/edit" exact component={EditUser} />
      <Auth path="/user/profile" exact component={ProfilePage} />
      <Auth path="/user" exact component={UserPage} />
      <Route path="/tweets" exact component={TweetsPage} />
      <Route path="/model/:qrytype/:name/:id" exact component={ModelPage} />
      <Route path="/modelpage" exct component={ModelPage} />
      <Route path="/" exact component={HomePage} />
      <Route
        render={() => (
          <div className="pageNotFound">
            {" "}
            <h3>404 Page not Found</h3>
          </div>
        )}
      />
    </Switch>
    // </Layout>
  );
};
export default Routes;
