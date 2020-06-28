import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

const SearchTweets = () => {
  const [errors, setErrors] = useState({});
  const [srchStr, setSrchStr] = useState("");

  const validData = () => {
    let errs = {};
    setErrors({});

    if (!srchStr) {
      errs.srchStr = "Inalid/Missing search string";
    }
    if (!srchStr) {
      setErrors(errs);
      return false;
    } else {
      return true;
    }
  };
  const qrytype = "srchstr";
  const name = "text";
  return (
    <div className="desktop-srch-form">
      <div className={classnames("search-form", { "has-error": errors })}>
        {errors.srchStr && <span className="help-block">{errors.comment}</span>}
        <input
          value={srchStr}
          placeholder="search tweets"
          onChange={(e) => setSrchStr(e.target.value)}
        />
        {srchStr ? (
          <Link to={`tweets/query/${qrytype}/${name}/${srchStr}`}>Q</Link>
        ) : null}
      </div>
    </div>
  );
};

export default SearchTweets;
