import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Tab,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Container,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listQuestions } from "../../actions/questionActions";
import Question from "../../components/Question";
// import {
//   CONSULTANT_CREATE_REVIEW_RESET,
//   USER_UPDATE_RESET,
// } from "../constants/userConstants";
// import Rating from "../components/Rating";
// import { userType } from "../constants/userType";

const ComputerScreen = () => {
  const dispatch = useDispatch();

  const questionList = useSelector((state) => state.questionList);
  const { loading, error, questions } = questionList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listQuestions());
  }, [dispatch]);

  let filteredQuestions = [];

  if (questions) {
    questions.forEach((question) => {
      if (question.category === "computer") {
        filteredQuestions.push(question);
      }
    });
  }

  return (
    <>
        <h1>Computer Problems</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {filteredQuestions.map((question) => (
              <Col key={question._id} sm={12} md={12} lg={12} xl={12}>
                <Question question={question} />
              </Col>
            ))}
          </Row>
        </>
      )}
      {questions && filteredQuestions.length === 0 && <Message variant="info">No questions found</Message>}
    </>
  );
};

export default ComputerScreen;
