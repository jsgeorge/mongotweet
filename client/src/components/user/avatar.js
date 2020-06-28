import React, { useContext, useEffect, useState } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const renderCardImage = (images) => {
  return images[0].url;
};

const Avatar = ({ images, size }) => {
  return (
    <div>
      {images && images.length > 0 && images[0].url ? (
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
          size="lg"
          id={size}
          style={{
            border: "2px solid blue",
            borderRadius: "100px",
            color: "blue",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
