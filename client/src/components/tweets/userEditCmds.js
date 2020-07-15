import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { UserContext } from "../../context/user-context";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import jwtDecode from "jwt-decode";

const UserEditCommands = ({ id, author }) => {
  //const [state, dispatch] = useContext(UserContext);
  const { user, isloggedin } = useContext(UserContext);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // const setAuthUser = async (token) => {
    //     const response = await axios.post("/users/id", { id: token.id });
    //     dispatch({
    //         type: "SET_USER",
    //         payload: response.data,
    //     });
    // };
    // if (localStorage.jwtToken){
    //     console.log('User is authenticted')
    //     setAuthUser(jwtDecode(localStorage.getItem("jwtToken")));
    // }
  }, []);

  const deleteTweet = async () => {
    try {
      await axios.delete(`/chats?id=${id}&author=${author}`);
      setRedirect(true);
    } catch (err) {
      console.log(err);
      setError("Cannot delete the selected tweet. Network error");
    }
  };

  const handleDelete = async () => {
    await deleteTweet();
  };

  //if (!state.user && !state.user[0]) return null;

  if (redirect) return <Redirect to="/tweets" />;

  return (
    <div className="edit-buttons-wrapper">
      {isloggedin && user && user._id === author ? (
        <span>
          <div className="user-edit-buttons">
            <div className="has-error">{error}</div>
            <Link to={`/tweets/${id}/edit`} className="btn btn-primary btn-sm">
              {" "}
              Edit
            </Link>

            <button className="btn btn-danger btn-sm" onClick={handleShow}>
              Delete
            </button>

            <Modal show={show} onHide={handleClose} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>Are You Sure</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are You sure you want to delete this tweet?
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-default btnDefault btn-sm"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </Modal.Footer>
            </Modal>
          </div>
        </span>
      ) : null}
    </div>
  );
};

export default UserEditCommands;
