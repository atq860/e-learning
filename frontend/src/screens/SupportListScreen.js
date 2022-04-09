import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProblems } from "../actions/supportActions";
import { userType } from "../constants/userType";
import { useNavigate } from "react-router-dom";

const SupportListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const problemList = useSelector((state) => state.problemList);
  const { loading, error, problems } = problemList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.type === userType.ADMIN) {
      dispatch(listProblems());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      <h1>Queries/Problems</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div variant="danger">{error}</div>
      ) : (
        <Table striped bordered hover responsive className="table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>EMAIL</th>
              <th>TITLE</th>
              <th>PROBLEM</th>
            </tr>
          </thead>

          <tbody>
            {problems.map((problem, index) => (
              <tr key={problem._id}>
                <td>{index + 1}</td>
                <td>{problem.user.name}</td>

                <td>
                  <a href={`mailto:${problem.user.email}`}>
                    {problem.user.email}
                  </a>
                </td>
                <td>{problem.title}</td>
                <td>{problem.problem}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {problems && problems.length === 0 && (
        <Message variant="info">No Problems at the moment</Message>
      )}
    </>
  );
};

export default SupportListScreen;
