import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { userType } from "../constants/userType";
import { USER_REGISTER_RESET } from "../constants/userConstants";

const RegisterScreen = ({ location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageApproval, setMessageApproval] = useState(null);
  const [select, setSelect] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location?.search ? location?.search?.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo && !userInfo.isApproved) {
      dispatch({ type: USER_REGISTER_RESET });

      setMessageApproval("Your account is sent to admin for approval");
    } else if (userInfo && userInfo.isApproved) {
      dispatch({ type: USER_REGISTER_RESET });
      navigate(redirect);
    }
    console.log("UserInfo ", userInfo);
  }, [userInfo, redirect, dispatch, navigate]);

  if (messageApproval) {
    alert(messageApproval);
  }

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      if (select === "expert") {
        dispatch(
          register({
            name,
            email,
            password,
            phone,
            country,
            city,
            type: userType.EXPERT,
          })
        );
      } else {
        dispatch(register({ name, email, password, isApproved: true }));
      }
    }
  };

  return (
    <FormContainer>
      <div className="container">
        <h1 /* style={{ textAlign: "center", marginTop: "2rem" }} */>
          Sign Up
        </h1>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}

        {loading && <Loader />}
        <Form
          onSubmit={
            submitHandler
          } /* style={{ border: "1px solid #F5F5F5", padding: "50px", borderRadius: "5px" }} */
        >
          <Form.Group controlId="rating" className="pb-5">
            <Form.Label>Sign Up as</Form.Label>

            <Form.Control
              as="select"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="expert">Expert</option>
              <option value="user">User/Student</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="pt-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          {select === "expert" && (
            <>
              <Form.Group controlId="phone" className="pt-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="03001234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="country" className="pt-3">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="city" className="pt-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            </>
          )}

          {/* <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            required
          />
        </div> */}

          <Form.Group controlId="password" className="pt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="pt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            Have an Account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
