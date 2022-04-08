import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, approveExpert } from "../actions/userActions";
import { EXPERT_APPROVE_RESET } from "../constants/userConstants";
import { useParams, useNavigate } from "react-router-dom";

const UserEditScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const expertApprove = useSelector((state) => state.expertApprove);
  const {
    loading: loadingApprove,
    error: errorApprove,
    success: successApprove,
  } = expertApprove;

  useEffect(() => {
    if (successApprove) {
      dispatch({ type: EXPERT_APPROVE_RESET });
      navigate("/admin/pendingExperts");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setCountry(user.country);
        setCity(user.city);
        setPhone(user.phone);
      }
    }
  }, [user, dispatch, userId, successApprove]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(approveExpert(user));
  };

  return (
    <>
      <Link to="/admin/pendingExperts" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Approve Expert</h1>
        {loadingApprove && <Loader />}
        {errorApprove && <div> {errorApprove} </div>}
        {loading ? (
          <Loader />
        ) : error ? (
          <div variant="danger">{error}</div>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId="makeAdmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={makeAdmin}
                onChange={(e) => {
                  setMakeAdmin(e.target.checked);
                  console.log("Check or not ==>", e.target.checked);
                  console.log("User Type ==>", user.type);
                }}
              ></Form.Check>
            </Form.Group> */}

            <Button
              type="submit"
              variant="primary"
              className="mt-3"
              disabled={user.isApproved}
            >
              Approve
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
