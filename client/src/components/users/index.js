import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import UserItem from "./item";
import { UsersContext } from "../../context/users-context";

export default function UsersListing() {
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  const { users, setusers } = useContext(UsersContext);
  //const [filters, setFilters] = useState([]);
  //let sortBy = { sortby: "createdAt", order: "desc" };

  useEffect(() => {
    let filters = [];
    const fetchData = async () => {
      try {
        const response = await axios.get("/users");
        setusers(response.data);
      } catch (err) {
        console.log(err);
        setError("Cannot retrieve the selected tweets. Network error");
      }
    };
    fetchData();
  }, []);

  //if (users) console.log(users);

  return (
    <div className="content-wrapper">
      <div className="tweets-wrapper">
        {error ? <div className="has-error">{error}</div> : null}
        {users && users.length > 0 ? (
          users.map((u) => <UserItem key={u._id} cuser={u} />)
        ) : (
          <div className="card-text">
            Bummer! There are no current users. Check back later "
          </div>
        )}
      </div>
    </div>
  );
}
