import React from "react";
import { Switch, Route } from "react-router-dom";
import Auth from "./components/auth";

//Pages
import HomePage from "./components/pages/home";
import SigninPage from "./components/auth/login";
import SignupPage from "./components/auth/register";
import UserPage from "./components/user";
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
      {/* <Route path="/chats/:id" exact component={Auth(Chat, true)} />
        <Route path="/user/favorites" exact component={Auth(Favorites, true)} />
        <Route path="/user/edit" exact component={Auth(EditAccount, true)} />*/}
      <Route path="/auth/signin" exact component={SigninPage} />
      <Route path="/auth/signup" exact component={SignupPage} />
      {/* <Route path="/user/list" exact component={Auth(UserList, true)} />
        <Route path="/user/favorites" exact component={Auth(Cart, true)} /> */}
      <Auth path="/user/edit" exact component={EditUser} />
      <Auth path="/user" exact component={UserPage} />
      <Route path="/tweets" exact component={TweetsPage} />
      <Route path="/model/:qrytype/:name/:id" exact component={ModelPage} />
      ' '
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
