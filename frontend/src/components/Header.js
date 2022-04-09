import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  ListGroup,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { userType } from "../constants/userType";

const Header = ({ success }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  console.log("Header success", success);

  return (
    <header>
      <Navbar
        // bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
        // className="fixed-top"
        style={{
          backgroundColor:
            userInfo && userInfo.type === userType.EXPERT
              ? "rgb(235, 113, 0)"
              : userInfo && userInfo.type === userType.ADMIN
              ? "#343a40"
              : "#4582ec",
        }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Ask Me</Navbar.Brand>

            {/* <Navbar.Brand className="mobilee-logo">
              <LinkContainer to="/">
                <img src="\logo192.png" alt="logo" className="logoImage" />
              </LinkContainer>
            </Navbar.Brand> */}
          </LinkContainer>
          {userInfo?.type === userType.EXPERT && (
            <div style={{ color: "white" }}>({userType.EXPERT})</div>
          )}
          {userInfo?.type === userType.ADMIN && (
            <div style={{ color: "white" }}>({userType.ADMIN})</div>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {/* <NavDropdown title="Categories" id="username"> */}
              <NavDropdown
                title={
                  <span className="showImage adminName-align">Categories</span>
                }
                id="username"
              >
                <LinkContainer to="/questions/maths">
                  <NavDropdown.Item>Maths</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/questions/physics">
                  <NavDropdown.Item>Physics</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/questions/sciences">
                  <NavDropdown.Item>General Sciences</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/questions/chemistry">
                  <NavDropdown.Item>Chemistry</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/questions/english">
                  <NavDropdown.Item>English</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/questions/computer">
                  <NavDropdown.Item>Computer</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/questions/business">
                  <NavDropdown.Item>Business/Finance</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/questions/other">
                  <NavDropdown.Item>Other</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>

              <LinkContainer to="/start-reading">
                <Nav.Link>Start Reading</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/support">
                <Nav.Link>Support</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/faq">
                <Nav.Link>FAQ</Nav.Link>
              </LinkContainer>
              {!userInfo && (
                <LinkContainer to="/login">
                  <Nav.Link>Getting Started</Nav.Link>
                </LinkContainer>
              )}
            </Nav>

            <Nav className="ml-auto">
              {userInfo ? (
                <>
                  {/* {userInfo.type === userType.USER && (
                    <Button onClick={() => navigate("/post-a-question")}>
                      Post a Question
                    </Button>
                  )} */}
                  {/* Responsive Start*/}
                  <div className="d-block d-lg-none mt-4">
                    <img
                      className="userImg showImage"
                      src={
                        userInfo.image && userInfo.image.length !== 0
                          ? userInfo.image
                          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt=""
                    />
                    <div className="userName userName-align">
                      {userInfo.name.split(" ", 1)}
                    </div>
                    <LinkContainer to="/profile">
                      <Nav.Link className="messages">
                        <div style={{ color: "rgba(0, 0, 0, 0.55)" }}>
                          Profile
                        </div>{" "}
                      </Nav.Link>
                    </LinkContainer>

                    <Nav.Link className="messages" onClick={logoutHandler}>
                      <div style={{ color: "rgba(0, 0, 0, 0.55)" }}>Logout</div>
                    </Nav.Link>
                  </div>
                  {/* Responsive End */}

                  <div
                    className="userName d-none d-lg-block"
                    style={{ color: "white" }}
                  >
                    {userInfo.name}
                  </div>

                  <NavDropdown
                    title={
                      <img
                        className="userImg showImage userImg-align"
                        src={
                          userInfo.image && userInfo.image.length !== 0
                            ? userInfo.image
                            : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        }
                        alt="DP"
                      />
                    }
                    id="username"
                    className="d-none d-lg-block"
                  >
                    {/* <ListGroup className="list-group-flush">
                      <ListGroup.Item style={{ fontSize: "20px" }}>
                        {userInfo.name.split(" ", 1)}
                      </ListGroup.Item>
                    </ListGroup> */}
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <i className="fas fa-user  icon-padding"></i>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className="fas fa-user  icon-padding"></i>Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  {/* <NavDropdown
                    title={
                      <i
                        className="fa fa-user icon-size"
                        aria-hidden="true"
                      ></i>
                    }
                    id="username"
                  >
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item style={{ fontSize: "20px" }}>
                        {userInfo.name.split(" ", 1)}
                      </ListGroup.Item>
                    </ListGroup>

                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <i className="fas fa-user  icon-padding"></i>
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className="fas fa-user  icon-padding"></i>Logout
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </>
              ) : (
                // <NavDropdown title={userInfo.name} id="username">
                // </NavDropdown>

                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      {/* <i className="fas fa-user"></i>  */}
                      Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      {/* <i className="fas fa-user"></i>  */}
                      Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && userInfo.type === userType.ADMIN && (
                // <NavDropdown title="Admin" id="adminmenu" style={{ marginTop: "5px" }}>
                <NavDropdown
                  title={
                    <span className="showImage adminName-align">Admin</span>
                  }
                  id="adminmenu"
                  style={{ marginTop: "6px" }}
                >
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/pendingExperts">
                    <NavDropdown.Item>Pending Approvals</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/problemlist">
                    <NavDropdown.Item>Problems</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
