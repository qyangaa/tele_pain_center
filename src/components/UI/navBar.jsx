import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Tracking from "../pages/tracking";

const NavBar = ({ user }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Tele Pain Center</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/tracking">Tracking</Nav.Link>
          <Nav.Link href="/search">Search Providers</Nav.Link>
          <Nav.Link href="/calendar">Calendar</Nav.Link>
          <Nav.Link href="/Records">Records</Nav.Link>
          <Nav.Link href="/Chat">Chat</Nav.Link>
          <Nav.Link href="/registration">Registration</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
