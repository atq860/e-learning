import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";

const Question = ({ question }) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <ListGroup>
      <ListGroupItem
        key={question._id}
        style={{
          marginBottom: "1rem",
          /* background: "#D2D2D2" */ fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <Row>
          <Col md={12}>
            <Link to={`/question/${question._id}`} style={{ color: "black" }}>
              <h3 style={{ fontWeight: 100, fontSize: "1.2rem" }}>
                {question.question}
              </h3>
            </Link>

            <div>
              <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                Posted by:{" "}
              </span>
              {question?.user?.name}
            </div>
            <div>
              <span style={{ fontSize: "1rem", fontWeight: 500 }}>Date: </span>
              {question?.createdAt?.substring(0, 10)}
            </div>
          </Col>
        </Row>
      </ListGroupItem>
    </ListGroup>
  );
};

export default Question;
