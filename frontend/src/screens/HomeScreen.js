import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userType } from "../constants/userType";

function HomeScreen() {
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handlePost = () => navigate("/post-a-question");

  return (
    <>
      {userInfo && userInfo.type === userType.USER && (
        <div>
          <Button className="mt-3 btn btn-info" onClick={handlePost}>
            Post Question
          </Button>
        </div>
      )}

      <div
        style={{
          backgroundImage: `url("/images/head3.jpg")`,
          marginTop: "2rem",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "60vh",
        }}
      >
        <Container>
          <Row>
            <Col md={12}>
              <h1
                style={{
                  color: "whitesmoke",
                  marginLeft: "3rem",
                  marginTop: "3rem",
                  fontSize: "2rem",
                }}
              >
                Learn with Us
              </h1>
            </Col>

            <Col md={6}>
              <p
                style={{
                  color: "whitesmoke",
                  marginLeft: "3rem",
                  fontSize: "1.5rem",
                }}
              >
                From first day to finals, get homework help, exam prep & writing
                support—tailored to your courses.
              </p>
            </Col>
            <Col md={6}></Col>
          </Row>

          <Row style={{ marginTop: "2.5rem" }}>
            <Col md={6}>
              <p
                style={{
                  color: "whitesmoke",
                  marginLeft: "3rem",
                  fontSize: "1.5rem",
                }}
              >
                Get Answers with our top Experts. They’ll help you with your
                Problems
              </p>
            </Col>
            <Col md={6}></Col>
          </Row>
        </Container>
      </div>

      <div style={{ marginTop: "3rem" }} className="py-5 container-fluid">
        <Row>
          <Col md={4}>
            <Card /* style={{ width: "18rem" }} */ className="mb-5 card-align">
              <Card.Img variant="top" src="/images/img1.jpg" />
              <Card.Body>
                <Card.Title className="mb-5" style={{ fontSize: "2rem" }}>
                  Homework Help
                </Card.Title>

                <Card.Text className="text">
                  Study with 55+ million step-by-step explanations, Expert Q&As
                  & math support.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-5 card-align">
              <Card.Img variant="top" src="/images/img2.png" />
              <Card.Body>
                <Card.Title className="mb-5" style={{ fontSize: "2rem" }}>
                  Exam Prep
                </Card.Title>

                <Card.Text className="text">
                  Figure out what you don’t know & get ready for test day with
                  practice exams & tips.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-5 card-align">
              <Card.Img variant="top" src="/images/img1.jpg" />
              <Card.Body>
                <Card.Title className="mb-5" style={{ fontSize: "2rem" }}>
                  Understand topic
                </Card.Title>

                <Card.Text className="text">
                  Simplify the toughest concepts with digestible topic
                  breakdowns & Soliutions
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem" }}>
          94% of Our customers say they get better grades when they use Chegg to
          understand their coursework
        </h1>
      </div>

      <div className="py-5 container-fluid">
        <Row>
          <Col md={6}>
            <div
              style={{
                backgroundImage: `url("https://assets.chegg.com/image/upload/c_scale,f_auto,q_auto,w_800/site-assets/marketing/landing-pages/Cheggcom/panel-careers.jpg")`,
                marginTop: "2rem",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "60vh",
              }}
            >
              <Container>
                <Row>
                  <Col md={12}>
                    <h1
                      style={{
                        color: "whitesmoke",
                        marginLeft: "3rem",
                        marginTop: "3rem",
                        fontSize: "2rem",
                      }}
                    >
                      Make your dream job a reality
                    </h1>
                  </Col>

                  <Col md={12}>
                    <p
                      style={{
                        color: "whitesmoke",
                        marginLeft: "3rem",
                        fontSize: "1.5rem",
                        marginTop: "2rem",
                      }}
                    >
                      Grow your skills and find opportunities. Explore Careers &
                      Internships
                    </p>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col md={6}>
            <div
              style={{
                backgroundImage: `url("https://assets.chegg.com/image/upload/c_scale,f_auto,q_auto,w_800/site-assets/marketing/landing-pages/Cheggcom/panel-life-xl.jpg")`,
                marginTop: "2rem",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "60vh",
              }}
            >
              <Container>
                <Row>
                  <Col md={12}>
                    <h1
                      style={{
                        color: "whitesmoke",
                        marginLeft: "3rem",
                        marginTop: "3rem",
                        fontSize: "2rem",
                      }}
                    >
                      Balance more than just classes
                    </h1>
                  </Col>

                  <Col md={6}>
                    <p
                      style={{
                        color: "whitesmoke",
                        marginLeft: "3rem",
                        fontSize: "1.5rem",
                        marginTop: "2rem",
                      }}
                    >
                      Navigate life and money matters.
                    </p>
                  </Col>
                  <Col md={6}></Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default HomeScreen;
