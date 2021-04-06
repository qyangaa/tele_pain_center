import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";
import Tracking from "../pages/tracking";
import { RiLoginCircleLine, RiMedicineBottleFill } from "react-icons/ri";

const NavBar = ({ user }) => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand href="#home">
        <RiMedicineBottleFill />
        Tele Pain Center
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Dashboard</Nav.Link>
          <Nav.Link href="/search">Search Providers</Nav.Link>
          <Nav.Link href="/calendar">Calendar</Nav.Link>
          <Nav.Link href="/Records">Records</Nav.Link>
          <Nav.Link href="/Chat">Chat</Nav.Link>
          <Nav.Link href="/waitingroom">Waiting Room</Nav.Link>
        </Nav>
        <Nav.Link href="/registration" className="icon">
          <RiLoginCircleLine />
        </Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
