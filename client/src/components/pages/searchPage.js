import React from "react";
import SearchTweets from "../tweets/search";
import Categories from "../categories";
import UserCard from "../user/card";

const SearchPage = () => {
  return (
    <div className="page-wrapper">
      <div className="row">
        <div className="col-lg-2 col-md-2  col-sm-3 col-xs-3 Lsidebar">
          <UserCard />
        </div>
        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-9 content">
          <div className="content-wrapper">
            <SearchTweets />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
