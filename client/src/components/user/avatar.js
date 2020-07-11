import React, { useContext, useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const renderCardImage = (images) => {
  return images[0].url;
};

const Avatar = ({ images, size }) => {
  useEffect(() => {}, []);
  return (
    <div>
      {images && images.length > 0 ? (
        <div
          className="avatar"
          id={size}
          style={{
            background: `url(${renderCardImage(images)}) no-repeat`,
          }}
        />
      ) : (
        <FontAwesomeIcon
          icon={faUser}
          size="sm"
          id={size}
          className="primary-clr"
          style={{
            border: "2px solid rgb(6, 135, 199)",
            borderRadius: "100px",
            paddng: "6px",
            width: "30px",
            height: "30px",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
