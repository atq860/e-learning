import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteUser, listUsers } from "../actions/userActions";
import { userType } from "../constants/userType";
import { useNavigate } from "react-router-dom";

const PendingExpertsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList; 

  // Admin Screen Access Security
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; 

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete; 

  useEffect(() => {
    if (userInfo && userInfo.type === userType.ADMIN) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDelete, userInfo]); // passing successDelete becoz want listUser to reload

  let pendingExperts = [];
  if(users && users.length > 0) {
    pendingExperts = users.filter(user => user.type === userType.EXPERT && !user.isApproved);
  }

  console.log("Expert ", pendingExperts);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>APPROVED</th>
              <th>ROLE</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {pendingExperts.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>

                {/* You can add onto this app later on, you could have internal message system,
                    Just an Idea of what you can add */}
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>

                <td>
                  {user.isApproved ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>{user.type}</td>

                <td>
                  <LinkContainer to={`/admin/pendingExperts/${user._id}/approve`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm ml-2"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {users && pendingExperts.length === 0 && (<Message variant="info">No Pending Experts</Message>)}
    </>
  );
};

export default PendingExpertsScreen;
