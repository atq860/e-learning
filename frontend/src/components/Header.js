import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  ListGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import { userType } from "../constants/userType";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header>
      <Navbar
        bg="primary"
        variant="dark"
        expand="lg"
        collapseOnSelect
        // className="fixed-top"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>E-Learning</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav>
              <NavDropdown title="Categories" /* id="username"*/>
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
              </NavDropdown>
            </Nav>

            <Nav className="ml-auto">
              {userInfo ? (
                <>
                  <NavDropdown
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

                    {/* {userInfo && userInfo.type === userType.USER && (
                      <LinkContainer to="/user/productlist">
                        <NavDropdown.Item>
                          <i className="fas fa-user  icon-padding"></i>My
                          Products
                        </NavDropdown.Item>
                      </LinkContainer>
                    )} */}

                    {/* {userInfo && userInfo.type === userType.CONSULTANT && (
                      <LinkContainer to="/consultant/inspectionlist">
                        <NavDropdown.Item>
                          <i className="fas fa-user  icon-padding"></i>
                          Inspections
                        </NavDropdown.Item>
                      </LinkContainer>
                    )} */}

                    <NavDropdown.Item onClick={logoutHandler}>
                      <i className="fas fa-user  icon-padding"></i>Logout
                    </NavDropdown.Item>
                  </NavDropdown>
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
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/pendingExperts">
                    <NavDropdown.Item>Pending Approvals</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/questionlist">
                    <NavDropdown.Item>Questions</NavDropdown.Item>
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
