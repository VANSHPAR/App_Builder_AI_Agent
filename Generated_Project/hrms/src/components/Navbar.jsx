import React from "react";
import { Navbar as BSNavbar, Nav, NavDropdown, Container } from "react-bootstrap";

const Navbar = ({ userName }) => (
  <BSNavbar bg="primary" variant="dark" expand="lg">
    <Container>
      <BSNavbar.Brand href="#">HRMS</BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavDropdown title={userName} id="user-nav-dropdown" align="end">
            <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </BSNavbar.Collapse>
    </Container>
  </BSNavbar>
);

export default Navbar;
