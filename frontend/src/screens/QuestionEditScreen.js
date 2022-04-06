import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  updateQuestion,
  listQuestionDetails,
} from "../actions/questionActions";
import { useParams, useNavigate } from "react-router-dom";
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
import { QUESTION_UPDATE_RESET } from "../constants/questionConstants";

function QuestionEditScreen() {
  const [updatedQuestion, setUpdatedQuestion] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const questionDetails = useSelector((state) => state.questionDetails);
  const { loading, error, question } = questionDetails;

  const questionUpdate = useSelector((state) => state.questionUpdate);
  const {
    loading: loadingQuestionUpdate,
    error: errorQuestionUpdate,
    answer,
    success,
  } = questionUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
    if (success) {
      dispatch({ type: QUESTION_UPDATE_RESET });
      navigate(`/question/${question._id}`);
    } else {
      if (!question.question || question._id !== params.id) {
        dispatch(listQuestionDetails(params.id));
        console.log("Dispatch");
      } else {
        setUpdatedQuestion(question.question);
        setImage(question.image);
      }
    }
    // dispatch(listQuestionDetails(params.id));

    // if (success) {
    //   dispatch({ type: QUESTION_UPDATE_RESET });
    //   navigate(`/question/${question._id}`);
    // }
  }, [userInfo, dispatch, success, navigate, question]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]; // you can upload multiple images, but we get 1st by files[0]
    const formData = new FormData(); // this is vanila JavaScript
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);

      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updateQuestion(params.id, { question: updatedQuestion, image }));
  };

  return (
    <>
      <h1>Edit Question</h1>
      {loadingQuestionUpdate && <Loader />}
      {errorQuestionUpdate && (
        <Message variant="danger">{errorQuestionUpdate}</Message>
      )}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="question">
                <Form.Label>Question</Form.Label>
                <Form.Control
                  as="textarea"
                  row="4"
                  value={updatedQuestion}
                  onChange={(e) => setUpdatedQuestion(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="image" className="mt-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                ></Form.Control>

                <Form.Control
                  type="file"
                //   id="image-file"
                  label="Choose File"
                  custom="true"
                  onChange={uploadFileHandler}
                ></Form.Control>

                {uploading && <Loader />}
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

export default QuestionEditScreen;
