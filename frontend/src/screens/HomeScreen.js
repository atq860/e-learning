import React from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

function HomeScreen() {
    const navigate = useNavigate();
  const handlePost = () => navigate("/post-a-question");
  
  return (
    <div>
      <Button className="float-right mt-3 btn btn-info" onClick={handlePost}>Post Question</Button>
      <h1>Welcome to Home</h1>
    </div>
  );
}

export default HomeScreen;
