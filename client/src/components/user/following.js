import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserItem2 from "../users/item2";
import { UsersContext } from "../../context/users-context";

export default function FollowingListing({ following }) {
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  const { users, setusers } = useContext(UsersContext);
  //const [filters, setFilters] = useState([]);
  //let sortBy = { sortby: "createdAt", order: "desc" };

  useEffect(() => {
    if (following) console.log("following list", following);
    // let filters = [];
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("/users");
    //     setusers(response.data);
    //   } catch (err) {
    //     console.log(err);
    //     setError("Cannot retrieve the selected tweets. Network error");
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <div className="content-wrapper">
      <div className="tweets-wrapper">
        {error ? <div className="has-error">{error}</div> : null}
        {following && following.length > 0 ? (
          following.map((u) => (
            <UserItem2 key={u.id} uid={u.id} />
            // <div key={u.id}>{u.id}</div>
          ))
        ) : (
          <div className="card-text">
            Bummer! There are no current users. Check back later "
          </div>
        )}
      </div>
    </div>
  );
}
