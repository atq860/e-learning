import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuestionAnswer,
  listQuestionDetails,
  deleteQuestion,
  deleteAnswer,
  closeQuestion,
} from "../actions/questionActions";
import { useParams } from "react-router-dom";
import Question from "../components/Question";
import Loader from "../components/Loader";
import Message from "../components/Message";
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
  Image,
} from "react-bootstrap";
import { QUESTION_CREATE_ANSWER_RESET } from "../constants/questionConstants";
import { useNavigate } from "react-router-dom";
import { userType } from "../constants/userType";

function QuestionScreen() {
  const [newAnswer, setNewAnswer] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const params = useParams();

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question } = questionDetails;

  const questionDelete = useSelector((state) => state.questionDelete);
  const { success: successQuestionDelete } = questionDelete;

  const questionClose = useSelector((state) => state.questionClose);
  const { success: successQuestionClose } = questionClose;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const questionAnswerCreate = useSelector(
    (state) => state.questionAnswerCreate
  );
  const {
    success: successQuestionAnswer,
    error: errorQuestionAnswer,
    loading: loadingQuestionAnswer,
  } = questionAnswerCreate;

  const answerDelete = useSelector((state) => state.answerDelete);
  const { success: successAnswerDelete } = answerDelete;

  useEffect(() => {
    // if (!userInfo) {
    //   navigate("/login");
    // }
    if (successQuestionDelete) {
      navigate("/");
    }
    if (successAnswerDelete || successQuestionClose) {
      dispatch(listQuestionDetails(params.id));
    }
    if (successQuestionAnswer) {
      alert("Solution Posted!!");
      setNewAnswer("");
      dispatch({ type: QUESTION_CREATE_ANSWER_RESET });
    }

    dispatch(listQuestionDetails(params.id));
  }, [
    dispatch,
    successQuestionAnswer,
    successAnswerDelete,
    userInfo,
    successQuestionDelete,
    navigate,
    successQuestionClose,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createQuestionAnswer(params.id, { answer: newAnswer }));
  };

  const deleteQuestionHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteQuestion(id));
    }
  };

  const deleteAnswerHandler = (questionId, answerId) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteAnswer(questionId, answerId));
    }
  };

  const closeQuestionHandler = (question) => {
    console.log("aksd ", question);
    if (window.confirm("Are You Sure")) {
      dispatch(closeQuestion(question));
    }
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
                  {/* <Link to={`${question._id}`} style={{ color: "black" }}> */}
                  <h3 style={{ fontWeight: 100, fontSize: "1.2rem" }}>
                    {question.question}
                  </h3>
                  {/* </Link> */}

                  <div>
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                      Posted by:{" "}
                    </span>
                    {question?.user?.name}
                  </div>
                  <div>
                    <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                      Date:{" "}
                    </span>
                    {question?.createdAt?.substring(0, 10)}
                  </div>
                  <div>
                    {question.image && (
                      <img
                        src={
                          question.image
                            ? question.image
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        }
                        style={{
                          width: "70%",
                          height: "70%",
                          // borderRadius: "50%",
                          objectFit: "cover",
                          // marginRight: "20px",
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                        alt={!question.image ? "No Image" : "Image"}
                      />
                    )}
                    {/* <Image src={question.image} /> */}
                  </div>

                  {question?.user?._id === userInfo?._id && (
                    <>
                      <Link
                        to={`/question/${question._id}/edit`}
                        className="btn btn-secondary my-3 mr-3"
                      >
                        Edit
                      </Link>
                      <Button
                        variant="danger"
                        onClick={() => deleteQuestionHandler(question._id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>

          {/* Solutions */}
          <Row>
            <Col md={6}>
              {question?.user?._id === userInfo?._id && (
                <Button
                  variant="warning"
                  className="float-right"
                  onClick={() => closeQuestionHandler(question)}
                >
                  Close Discussion
                </Button>
              )}
              <h2>Solutions</h2>
              {question.answers.length === 0 && (
                <Message variant="info">No Solution</Message>
              )}
              <ListGroup variant="flush">
                {question.answers.map((answer) => (
                  <ListGroupItem
                    key={answer._id}
                    style={{
                      marginBottom: "1rem",
                      fontFamily: "Arial, Helvetica, sans-serif",
                    }}
                  >
                    <Row>
                      <Col md={12}>
                        {/* <Link to={`${question._id}`} style={{ color: "black" }}> */}
                        <h3 style={{ fontWeight: 100, fontSize: "1.2rem" }}>
                          {answer.answer}
                        </h3>
                        {/* </Link> */}

                        <div>
                          <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                            Posted by:{" "}
                          </span>
                          {answer.name} (
                          {answer.user === question.user._id ? (
                            <>Author</>
                          ) : answer.userType === userType.EXPERT ? (
                            <>Expert</>
                          ) : (
                            <>Student</>
                          )}
                          )
                        </div>
                        <div>
                          <span style={{ fontSize: "1rem", fontWeight: 500 }}>
                            Date:{" "}
                          </span>
                          {answer?.createdAt?.substring(0, 10)}
                        </div>

                        {answer?.user === userInfo?._id && (
                          <>
                            <Link
                              to={`answer/${answer._id}`}
                              className="btn btn-secondary my-3 mr-3"
                            >
                              Edit
                            </Link>
                            <Button
                              variant="danger"
                              onClick={() =>
                                deleteAnswerHandler(question._id, answer._id)
                              }
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </Col>
                    </Row>
                  </ListGroupItem>
                  // <ListGroup.Item key={review._id}>
                  //   <strong>{review.name}</strong>
                  //   <Rating value={review.rating} />
                  //   <p>{review.createdAt.substring(0, 10)}</p>
                  //   <p>{review.comment}</p>
                  // </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Post</h2>
                  {errorQuestionAnswer && (
                    <Message>{errorQuestionAnswer}</Message>
                  )}
                  {userInfo ? (
                    <>
                      {question?.isClosed ? (
                        <Message variant="info">Question is Closed</Message>
                      ) : (
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId="comment">
                            <Form.Label>Solution</Form.Label>

                            <Form.Control
                              as="textarea"
                              row="3"
                              value={newAnswer}
                              onChange={(e) => setNewAnswer(e.target.value)}
                            ></Form.Control>
                          </Form.Group>

                          <Button
                            type="submit"
                            variant="primary"
                            className="mt-3"
                          >
                            Post
                          </Button>
                        </Form>
                      )}
                    </>
                  ) : (
                    <div>
                      Please <Link to="/login">sign in</Link> to Post a Solution
                    </div>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default QuestionScreen;
