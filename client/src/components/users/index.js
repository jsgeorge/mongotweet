import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import UserItem from "./item";
import { UsersContext } from "../../context/users-context";
import { UserContext } from "../../context/user-context";
import  LoadingSpinner  from "../utils/LoadingSpinner";

export default function UsersListing() {
  const { isloggedin, user } = useContext(UserContext);
  const [error, setError] = useState("");
  const [header, setHeader] = useState("");
  const { users, setusers } = useContext(UsersContext);
  const [ isLoading, setisLoading ] = useState(true);

  //const [filters, setFilters] = useState([]);
  //let sortBy = { sortby: "createdAt", order: "desc" };

  useEffect(() => {
    let filters = [];
    setisLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get("/users");
        setusers(response.data);
        setisLoading(false);
      } catch (err) {
        console.log(err);
        setError("Cannot retrieve tue. Network error");
        setisLoading(false);
      }
    };
    fetchData();
  }, []);

  //if (users) console.log(users);
  if (!isloggedin || !user) return <Redirect to="/" />;
  return (
    <div className="content-wrapper">
      <div className="tweets-wrapper">
        {error ? <div className="has-error">{error}</div> : null}
         {isLoading && (
             <div className="center">
               <LoadingSpinner asOverlay />
               </div>
           )}
        {users && users.length > 0 ? (
          users.map((u) => <UserItem key={u._id} cuser={u} />)
        ) : (
          <span>
            {!error && (
              <div className="card-text">
                Bummer! There are no current users. Check back later
              </div>
            )}
          </span>
        )}

      </div>
    </div>
  );
}
