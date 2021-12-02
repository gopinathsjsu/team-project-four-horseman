import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.css";

function NavBar() {
  const history = useHistory();
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    setInterval(() => {
      const user = localStorage.getItem("user");
      if (user != null && user != undefined) {
        setUserDetails(JSON.parse(user));
      }
    }, 1000);
  }, []);

  const logoutClicked = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setUserDetails(null);
    history.replace("/");
  };
  const loginClicked = (e) => {
    e.preventDefault();
    history.push("/login");
  };
  const signUpClicked = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  return (
    <Navbar
      className="me-auto my-2 my-lg-0"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container fluid>
        <Navbar.Brand href="/">Four Horsemen Airlines</Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {userDetails && <Nav.Link href="/userprofile">Profile</Nav.Link>}
          </Nav>
          <Form className="d-flex">
            {userDetails ? (
              <Button onClick={logoutClicked} variant="outline-primary">
                Logout
              </Button>
            ) : (
              <div>
                <Button onClick={loginClicked} variant="outline-primary">
                  Login
                </Button>
                <Button onClick={signUpClicked} variant="outline-primary">
                  Signup
                </Button>
              </div>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
      {userDetails && <p>{userDetails.id}</p>}
    </Navbar>
  );
}

export default NavBar;
