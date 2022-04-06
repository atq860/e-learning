import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAnswer,
  listQuestionDetails,
} from "../../actions/questionActions";
import { useParams, useNavigate } from "react-router-dom";
import Question from "../../components/Question";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
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
import { ANSWER_UPDATE_RESET } from "../../constants/questionConstants";

function MathsAnswerScreen() {
  const [updatedAnswer, setUpdatedAnswer] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question } = questionDetails;

  const answerUpdate = useSelector((state) => state.answerUpdate);
  const {
    loading: loadingAnswerUpdate,
    error: errorAnswerUpdate,
    answer,
    success,
  } = answerUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  var newAnswer;

  useEffect(() => {
    dispatch(listQuestionDetails(params.id));

    if (success) {
      dispatch({ type: ANSWER_UPDATE_RESET });
      navigate(`/questions/maths/${question._id}`);
    }
  }, [dispatch, success]);

  function updateValue() {
    if (question) {
      question.answers.forEach((answer) => {
        if (answer._id === params.answerId) {
          newAnswer = answer;
        }
      });
    }
  }
  updateValue();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateAnswer(params.id, params.answerId, { answer: updatedAnswer })
    );
  };

  return (
    <>
      <h1>Edit Solution</h1>
      {loadingAnswerUpdate && <Loader />}
      {errorAnswerUpdate && (
        <Message variant="danger">{errorAnswerUpdate}</Message>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="comment">
                <Form.Label>Solution</Form.Label>

                <Form.Control
                  as="textarea"
                  row="4"
                  value={updatedAnswer ? updatedAnswer : newAnswer?.answer}
                  onChange={(e) => setUpdatedAnswer(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                Save Edits
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  );
}

export default MathsAnswerScreen;
