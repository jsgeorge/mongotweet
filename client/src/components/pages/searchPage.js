import React from "react";
import SearchTweets from "../tweets/search";
import Categories from "../categories";
const SearchPage = () => {
  return (
    <div className="card-text">
      <SearchTweets />
      <Categories />
    </div>
  );
};

export default SearchPage;
