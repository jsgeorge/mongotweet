import React from "react";
import SearchTweets from "../tweets/search";
import Categories from "../categories";
const SearchPage = () => {
  return (
    <div className="page-wrapper">
      <div className="card-text">
        <SearchTweets />
        <Categories />
      </div>
    </div>
  );
};

export default SearchPage;
