import React from "react";
import { Link } from "react-router-dom";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import faShoppingBag from "@fortawesome/fontawesome-free-solid/faShoppingBag";
import faStar from "@fortawesome/fontawesome-free-solid/faStar";

const MyButton = ({ type, title, linkTo }) => {
  const buttons = () => {
    let template = "";

    switch (type) {
      case "default":
        template = (
          <Link
            className={!match.altClass ? "link_default" : match.altClass}
            to={match.params.linkTo}
            {...match.params.addStyles}
          >
            {match.params.title}
          </Link>
        );
        break;
      case "home":
        template = (
          <Link
            className={!props.altClass ? "link_home" : props.altClass}
            to={props.linkTo}
            {...props.addStyles}
          >
            {props.title}
          </Link>
        );
        break;
      case "add_faorites_link":
        template = (
          <div
            className="add_favorites_link"
            onClick={() => {
              props.runAction();
            }}
          >
            <FontAwesomeIcon icon={faStar} />
          </div>
        );
        break;
      case "add_to_cart_link":
        template = (
          <div
            className="add_to_cart_link"
            onClick={() => {
              props.runAction();
            }}
          >
            <FontAwesomeIcon icon={faShoppingBag} />
            Add to cart
          </div>
        );
        break;
      case "register_submit":
        template = (
          <div
            className={!props.altClass ? "link_default" : props.altClass}
            onClick={() => {
              props.runAction();
            }}
          >
            Register
          </div>
        );
        break;
      case "logout_link":
        template = (
          <div
            className="logout_link"
            onClick={() => {
              props.runAction();
            }}
          >
            <FontAwesomeIcon icon={faShoppingBag} />
          </div>
        );
        break;
      default:
        template = "";
    }
    return template;
  };

  return <div className="my_link">{buttons()}</div>;
};

export default MyButton;
