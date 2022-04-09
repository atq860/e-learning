import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createProblem } from "../actions/supportActions";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Row, Col, Form } from "react-bootstrap";
import { PROBLEM_CREATE_RESET } from "../constants/supportConstants";

function SupportScreen() {
  const [title, setTitle] = useState("");
  const [newProblem, setNewProblem] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const problemCreate = useSelector((state) => state.problemCreate);
  const { loading, error, success, problem } = problemCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (success) {
      dispatch({ type: PROBLEM_CREATE_RESET });
      setMessage("Your Request has been sent")
      setTitle("");
      setNewProblem("");
    }
  }, [dispatch, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(createProblem({ title, problem: newProblem }));
  };

  return (
    <>
      <h1>Tell Us Your Problem</h1>
      {message && <Message variant="success">{message}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              {/* <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  as="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="problem" className="mt-3">
                <Form.Label>Problem</Form.Label>
                <Form.Control
                  as="textarea"
                  row="4"
                  value={newProblem}
                  onChange={(e) => setNewProblem(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                Send
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
}

export default SupportScreen;
