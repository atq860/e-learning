import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createQuestion, listQuestions } from "../actions/questionActions";
import { QUESTION_CREATE_RESET } from "../constants/questionConstants";
import { useNavigate } from "react-router-dom";
import { userType } from "../constants/userType";

const QuestionPostScreen = () => {
  const [category, setCategory] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const questionCreate = useSelector((state) => state.questionCreate);
  const { loading, error, question, success } = questionCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(!userInfo || (userInfo && userInfo.type !== userType.USER)) {
      navigate("/");
    }
    if (success) {
      setCategory("");
      setNewQuestion("");
      setImage("");
      //   dispatch({ type: QUESTION_CREATE_RESET });
      //   navigate("/user/questionlist");

      dispatch(listQuestions());
    }
  }, [userInfo, navigate, dispatch, success]);

  // this is async since we are passing http request
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

  console.log("Image ", image);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createQuestion({
        category,
        question: newQuestion,
        image,
      })
    );
  };

  return (
    <>
      <Link to="/user/questionlist" className="btn btn-light my-3">
        Go Back
      </Link>

      {/* {image && <Image src={image} alt="image" fluid></Image>} */}


      <FormContainer>
        <h1>Post a Question</h1>

        {loading && <Loader />}
        {error && <Message variant="danger"> {error} </Message>}
        {success && (
          <Message variant="success"> Your Question is Posted </Message>
        )}

        {/* {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : ( */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="rating" /* className="pb-5" */>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="maths">Calculus/Maths</option>
              <option value="physics">Physics</option>
              <option value="sciences">General Sciences</option>
              <option value="chemistry">Chemistry</option>
              <option value="english">English</option>
              <option value="computer">Computer</option>
              <option value="business">Business/Finance</option>
              <option value="other">Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="question" className="mt-3">
            <Form.Label>Question</Form.Label>

            <Form.Control
              as="textarea"
              row="3"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
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
              label="Choose File"
              custom="true"
              onChange={uploadFileHandler}
            />

            {/* <Form.File
              id="image-file"
              label="Choose File"
              custom
              onChange={uploadFileHandler}
            ></Form.File> */}

            {uploading && <Loader />}
            
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Post
          </Button>
        </Form>
        {/* )} */}
      </FormContainer>
    </>
  );
};

export default QuestionPostScreen;
