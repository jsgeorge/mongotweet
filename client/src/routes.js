import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/auth";

//Pages
import HomePage from "./components/pages/home";
//auth
import SigninPage from "./components/auth/login";
import SignupPage from "./components/auth/register";
//user
import UserPage from "./components/user";
import ProfilePage from "./components/user/profile";
import EditUser from "./components/user/edit";
//users
import UsersPage from "./components/pages/users";
//tweets
import TweetsPage from "./components/pages/tweets";
import TweetQuery from "./components/pages/tweetsQuery";
import AddTweetPage from "./components/pages/addPage";
import TweetDetailPage from "./components/pages/tweetDetail";
import SearchPage from "./components/pages/searchPage";
import EditTweetPage from "./components/pages/editTweet";
//
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
      <Route path="/tweets/query/:qrytype/:name" exact component={TweetQuery} />
      <Route path="/tweets/:id/view" exact component={TweetDetailPage} />
      <Route path="/tweets/:id/edit" exact component={EditTweetPage} />
      <Route path="/tweets/search" exact component={SearchPage} />
      <Route path="/tweets/add" exact component={AddTweetPage} />

      <Route path="/auth/signin" exact component={SigninPage} />
      <Route path="/auth/signup" exact component={SignupPage} />

      <Auth path="/user/:id/profile" exact component={ProfilePage} />
      <Auth path="/user/edit" exact component={EditUser} />
      <Auth path="/user/profile" exact component={ProfilePage} />
      <Auth path="/users" exact component={UsersPage} />

      <Auth path="/user" exact component={UserPage} />
      <Route path="/tweets" exact component={TweetsPage} />
      <Route path="/model/:qrytype/:name/:id" exact component={ModelPage} />
      <Route path="/model/:qrytype/:name" exact component={ModelPage} />

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
