"use client";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavigationBar() {
  return (
    <Navbar bg="dark" data-bs-theme="dark" style={{ marginBottom: "15px", height: "65px"}}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/bus">Bus Arrival</Nav.Link>
          <Nav.Link href="/bicycle">Bicycle Parking</Nav.Link>
          <Nav.Link href="/MRT">MRT Crowd</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}