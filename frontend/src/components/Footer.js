import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
    // style={{ background: "#ff0000", color: "white" }}
    >
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Ask Me</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
