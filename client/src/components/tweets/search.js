import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div className="search-form">
        <input value={srchStr} placeholder="search" onChange={(e) => setSrchStr(e.target.value)}/>
         <Link to={`tweets/query/${qrytype}/${name}/${srchStr}`}>   <FontAwesomeIcon
               icon={faSearch}
                   size="lg"
                   className="primary-clr"
                 /></Link>
    </div>
    // <div className="search-form">
    //   <div className={classnames("form-srch srch", { "has-error": errors })}>
    //     {errors.srchStr && <span className="help-block">{errors.comment}</span>}
    //     <input
    //       value={srchStr}
    //       placeholder="search tweets"
    //       onChange={(e) => setSrchStr(e.target.value)}
    //     />
       
    //       <Link to={`tweets/query/${qrytype}/${name}/${srchStr}`}>   <FontAwesomeIcon
    //               icon={faSearch}
    //               size="lg"
    //               className="primary-clr"
    //             /></Link>
       
    //   </div>
    // </div>
      );
};

export default SearchTweets;
