import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const FavoriteButton = ({ id, uid }) => {
  //const [state, dispatch] = useContext(UserContext);
  const [error, setError] = useState("");
  const [favorite, setFavorite] = useState(false);

  const handleHeart = () =>
    favorite ? (
      <FontAwesomeIcon
        icon={faHeart}
        style={{ color: "rgb(25, 123, 189)", marginLeft: "4px" }}
      />
    ) : (
      <FontAwesomeIcon
        icon={faHeart}
        style={{ color: "#ccc", marginLeft: "4px" }}
      />
    );
  const AddFavorite = async (id, uid) => {
    // try {
    //   console.log("Adding to favorite");
    //   const response = await axios.post(`/users/addFav?uid=${uid}&id=${id}`);
    //   dispatch({
    //     type: "ADD_FAVORITE",
    //     payload: response.data,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const SubtractFavorite = async (id, uid) => {
    // try {
    //   console.log("Deletiung from favorite");
    //   const response = await axios.post(`/users/delFav?uid=${uid}&id=${id}`);
    //   dispatch({
    //     type: "DEL_FAVORITE",
    //     payload: response.data,
    //   });
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const changeFavorite = async (id, uid) => {
    setFavorite(!favorite);
    if (favorite) {
      await SubtractFavorite(id, uid);
    } else {
      await AddFavorite(id, uid);
    }
  };

  return (
    <button
      className="add_favorites"
      onClick={() => {
        changeFavorite(id, uid);
      }}
    >
      {handleHeart()}
      favorites
    </button>
  );
};

export default FavoriteButton;
