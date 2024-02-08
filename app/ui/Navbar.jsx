// Done by: Audrey, Ayden and Bryan
// creating and importing styles from Navbar.module.css did not seem to work hence inline CSS is used

"use client";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavigationBar() {
  return (
    <Navbar className="bg-body-tertiary" style={{height: "65px"}}>
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/" style={{color: '#000000'}}>Home</Nav.Link>
          <Nav.Link href="/bus" style={{color: '#000000'}}>Bus Arrival</Nav.Link>
          <Nav.Link href="/bicycle" style={{color: '#000000'}}>Bicycle Parking</Nav.Link>
          <Nav.Link href="/MRT" style={{color: '#000000'}}>MRT Crowd</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}