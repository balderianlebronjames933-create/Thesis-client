import React from 'react';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const NavbarComponent = () => {
  const { user, isAdmin, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-3" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          🎬 RottenMangoes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton className="bg-dark text-white">
            <Offcanvas.Title id="offcanvasNavbarLabel">
              🎬 RottenMangoes
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="bg-dark">
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link as={Link} to="/" className="text-white">
                Home
              </Nav.Link>

              {isAdmin && (
                <Nav.Link as={Link} to="/movies" className="text-white">
                  Dashboard
                </Nav.Link>
              )}

              {user && !isAdmin && (
                <Nav.Link as={Link} to="/movies" className="text-white">
                  Movies
                </Nav.Link>
              )}

              {!user && (
                <>
                  <Nav.Link as={Link} to="/login" className="text-white">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" className="text-white">
                    Register
                  </Nav.Link>
                </>
              )}

              {user && (
                <Button
                  variant="outline-light"
                  onClick={handleLogout}
                  className="mt-2"
                >
                  Logout
                </Button>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
