"use client";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavigationBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" style={{ marginBottom: "15px" }}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/fetch_ip">IP Information</Nav.Link>
          <Nav.Link href="/timer">Timer</Nav.Link>
          <Nav.Link href="/storage">Storage</Nav.Link>
          <Nav.Link href="/bus">Bus Arrival</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}